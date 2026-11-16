import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../estilos/checkout.css";
import logoOnepay from "../assets/logos/onepay-transbank.png";
import logoWebpay from "../assets/logos/webpay-transbank.svg";
import logoMercadoPago from "../assets/logos/mercado-pago.png";
import { CargandoCompra } from "../componentes/CargandoCompra";
import { ConfirmarEliminar } from "../componentes/ConfirmarEliminar";
import { Footer } from "../componentes/Footer";
import { Icono } from "../componentes/Icono";
import { Portada } from "../componentes/Portada";
import { RutaNavegacion } from "../componentes/RutaNavegacion";
import { usePeticion } from "../componentes/usePeticion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { REGIONES, comunasDe } from "../datos/regiones";
import { resumenCarrito, useCarritoStore } from "../estado/carritoStore";
import { useSesionStore } from "../estado/sesionStore";
import { REGEX_EMAIL } from "../utils/validacion";
import { vaciarCarrito } from "../servicios/carritoServicio";
import {
  cotizarEnvio,
  crearPedido,
  iniciarSesion,
  montoDelDescuento,
  validarDescuento,
} from "../servicios/checkoutServicio";
import type {
  DescuentoResponse,
  ConfirmacionPedido,
  MetodoEnvio,
  MetodoPago,
} from "../tipos/checkout";
import { formatearPrecio } from "../utils/formato";
import { mensajeDeError } from "../utils/mensajesError";

// Checkout en alta fidelidad (Figma, Versión 2). Tiene cinco variantes:
// - Sin sesión: tarjeta de inicio de sesión (node 1651:17178).
// - Sesión iniciada con dirección guardada (node 3059:46245) y con el
//   formulario para agregar una nueva (node 3493:17045).
// - Compra como invitado (node 3478:29140).
// - Sesión iniciada sin dirección guardada (node 3639:38538).

const METODOS_PAGO: { valor: MetodoPago; nombre: string; logo?: string }[] = [
  { valor: "onepay", nombre: "Onepay - Débito, crédito y prepago", logo: logoOnepay },
  { valor: "webpay", nombre: "Webpay - Débito, crédito y prepago", logo: logoWebpay },
  { valor: "mercadopago", nombre: "Mercado pago", logo: logoMercadoPago },
  { valor: "transferencia", nombre: "Transferencia electrónica" },
];

const RUTA = [{ texto: "Inicio", ruta: "/" }, { texto: "Carrito" }, { texto: "Check out" }];

const REGEX_TELEFONO = /^\+?[0-9\s]{8,15}$/;
// Celular chileno que exige la API para despachar (ej. +56912345678)
const REGEX_CELULAR = /^(\+?56)?9\d{8}$/;

// Tiempo mínimo (ms) de la pantalla "¡Tu próxima lectura está cerca!"
const TIEMPO_MINIMO_ESPERA = 1500;

type Errores = Record<string, string>;

// Campo del formulario (Figma: form-label): etiqueta de 12px con asterisco
// rojo si es obligatorio, campo de 48px y espacio para el error
function Campo({
  id,
  etiqueta,
  obligatorio = true,
  error,
  className,
  children,
}: {
  id: string;
  etiqueta: string;
  obligatorio?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`checkout-campo${className ? ` ${className}` : ""}`}>
      <label htmlFor={id}>
        {etiqueta}
        {obligatorio && <span className="checkout-obligatorio" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <span className="checkout-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

function Checkout() {
  useTituloPagina("Checkout");
  const navegar = useNavigate();
  const items = useCarritoStore((e) => e.items);
  const { usuario, invitado, iniciar, continuarComoInvitado } = useSesionStore();

  const [login, setLogin] = useState({ email: "", password: "" });
  const [verPassword, setVerPassword] = useState(false);
  const [erroresLogin, setErroresLogin] = useState<Errores>({});
  const [cargandoLogin, setCargandoLogin] = useState(false);
  const [emailInvitado, setEmailInvitado] = useState("");
  // Quien recibe el despacho (o quien retira, si compra como invitado)
  const [contacto, setContacto] = useState({ nombre: "", apellido: "", telefono: "" });

  const [metodoEnvio, setMetodoEnvio] = useState<MetodoEnvio>("despacho");
  const [direccion, setDireccion] = useState({
    direccion: "",
    numero: "",
    depto: "",
    region: "",
    comuna: "",
  });
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("onepay");
  const [terminos, setTerminos] = useState(false);
  const [errores, setErrores] = useState<Errores>({});
  const [procesando, setProcesando] = useState(false);

  const [usarGuardada, setUsarGuardada] = useState(true);
  const [idPorEliminar, setIdPorEliminar] = useState<string | null>(null);
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState<DescuentoResponse | null>(null);
  const [errorCodigo, setErrorCodigo] = useState("");

  const { subtotal, totalItems } = resumenCarrito(items);
  const montoDescuento = montoDelDescuento(descuento, subtotal);
  const esInvitado = invitado && !usuario;
  const emailActual = usuario?.email ?? (invitado ? emailInvitado : login.email);
  const nombreContacto = `${contacto.nombre.trim()} ${contacto.apellido.trim()}`.trim();
  const guardada = usuario?.direccionGuardada;
  const usandoGuardada = Boolean(guardada) && usarGuardada;
  const sesionLista = Boolean(usuario) || invitado;
  // Con despacho a una dirección nueva se pide el formulario completo; el
  // invitado que retira en tienda deja solo su nombre y teléfono
  const pideDireccion = metodoEnvio === "despacho" && !usandoGuardada;
  const pideDatosRetiro = metodoEnvio === "retiro" && esInvitado;

  // ENVÍO: se cotiza con el servicio (POST /envios/cotizar) al elegir
  // retiro, o región y comuna de despacho
  const regionEnvio = usandoGuardada ? (guardada?.region ?? "") : direccion.region;
  const comunaEnvio = usandoGuardada ? (guardada?.comuna ?? "") : direccion.comuna;
  const listoParaCotizar =
    items.length > 0 && (metodoEnvio === "retiro" || Boolean(regionEnvio && comunaEnvio));
  const cotizacion = usePeticion(
    () =>
      listoParaCotizar
        ? cotizarEnvio({ metodoEnvio, region: regionEnvio, comuna: comunaEnvio, subtotal })
        : Promise.resolve(null),
    JSON.stringify([listoParaCotizar, metodoEnvio, regionEnvio, comunaEnvio, subtotal]),
  );
  const datosEnvio = listoParaCotizar && !cotizacion.error ? cotizacion.datos : null;
  const errorEnvio = cotizacion.error ? mensajeDeError(cotizacion.error) : "";
  const envio = datosEnvio?.costo ?? 0;
  const total = subtotal - montoDescuento + envio;
  const textoEnvio = !listoParaCotizar
    ? "Por calcular"
    : cotizacion.cargando
      ? "Calculando..."
      : errorEnvio
        ? "—"
        : formatearPrecio(envio);

  async function manejarLogin() {
    const nuevos: Errores = {};
    if (!REGEX_EMAIL.test(login.email)) nuevos.email = "Correo inválido";
    if (!login.password) nuevos.password = "Ingresa tu contraseña";
    setErroresLogin(nuevos);
    if (Object.keys(nuevos).length) return;
    setCargandoLogin(true);
    try {
      iniciar(await iniciarSesion(login));
      setErrores((e) => ({ ...e, sesion: "" }));
    } catch (err) {
      setErroresLogin({ general: (err as Error).message });
    } finally {
      setCargandoLogin(false);
    }
  }

  function cambiarAInvitado() {
    setErroresLogin({});
    setErrores((e) => ({ ...e, sesion: "" }));
    continuarComoInvitado();
  }

  async function aplicarCodigo() {
    setErrorCodigo("");
    try {
      setDescuento(
        await validarDescuento({
          codigo,
          subtotal,
          // Algunos cupones son por persona: el correo permite validarlo
          email: REGEX_EMAIL.test(emailActual) ? emailActual : undefined,
        }),
      );
    } catch (err) {
      setDescuento(null);
      setErrorCodigo(mensajeDeError(err));
    }
  }

  function cambiarDireccion(campo: keyof typeof direccion, valor: string) {
    setDireccion((d) => ({
      ...d,
      [campo]: valor,
      ...(campo === "region" ? { comuna: "" } : {}),
    }));
  }

  function cambiarContacto(campo: keyof typeof contacto, valor: string) {
    setContacto((c) => ({ ...c, [campo]: valor }));
  }

  async function pagar(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    const nuevos: Errores = {};
    if (!sesionLista) {
      nuevos.sesion = "Inicia sesión o continúa como invitado";
    }
    if (esInvitado && !REGEX_EMAIL.test(emailInvitado)) {
      nuevos.emailInvitado = "Correo inválido";
    }
    if (pideDireccion || pideDatosRetiro) {
      if (!contacto.nombre.trim()) nuevos.nombre = "Campo obligatorio";
      if (!contacto.apellido.trim()) nuevos.apellido = "Campo obligatorio";
      // Para despachar, la API exige un celular chileno
      if (pideDireccion) {
        if (!REGEX_CELULAR.test(contacto.telefono.replace(/\s/g, ""))) {
          nuevos.telefono = "Ingresa un celular válido, por ejemplo +56912345678";
        }
      } else if (!REGEX_TELEFONO.test(contacto.telefono)) {
        nuevos.telefono = "Ingresa un teléfono válido";
      }
    }
    if (pideDireccion) {
      if (!direccion.direccion.trim()) nuevos.direccion = "Campo obligatorio";
      if (!direccion.numero.trim()) nuevos.numero = "Campo obligatorio";
      if (!direccion.depto.trim()) nuevos.depto = "Campo obligatorio";
      if (!direccion.region) nuevos.region = "Selecciona una región";
      if (!direccion.comuna) nuevos.comuna = "Selecciona una comuna";
    }
    if (!items.length) nuevos.items = "Tu carrito está vacío";
    if (metodoEnvio === "despacho" && errorEnvio) nuevos.comuna = errorEnvio;
    if (!terminos) nuevos.terminos = "Debes aceptar los términos";
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;

    setProcesando(true);
    // La pantalla de espera parte desde arriba
    window.scrollTo({ top: 0 });
    try {
      const itemsPedido = items.map((item) => ({ ...item }));
      const direccionEntrega =
        metodoEnvio === "despacho"
          ? usandoGuardada && guardada
            ? {
                direccion: guardada.direccion,
                numero: guardada.numero,
                depto: guardada.depto,
                region: guardada.region,
                comuna: guardada.comuna,
              }
            : { ...direccion }
          : undefined;
      const telefono = usandoGuardada ? guardada?.telefono : contacto.telefono || undefined;
      const nombreComprador = usuario
        ? `${usuario.nombre} ${usuario.apellido}`.trim()
        : nombreContacto;
      // Quien recibe el despacho es quien se escribió en el formulario
      const nombreReceptor = pideDireccion ? nombreContacto : nombreComprador;
      // La pantalla de espera se muestra al menos TIEMPO_MINIMO_ESPERA, para
      // que no parpadee cuando la API responde muy rápido
      const [respuesta] = await Promise.all([
        crearPedido({
          email: emailActual,
          nombre: nombreComprador,
          nombreReceptor,
          telefono,
          metodoEnvio,
          ...(direccionEntrega ?? {}),
          metodoPago,
          codigoDescuento: descuento?.codigo,
          items: items.map((i) => ({ idLibro: i.idLibro, cantidad: i.cantidad })),
        }),
        new Promise((resolver) => setTimeout(resolver, TIEMPO_MINIMO_ESPERA)),
      ]);
      // Con la API, los montos son los que calculó Backend al crear el pedido
      const montos = respuesta.montos ?? {
        subtotal,
        descuento: montoDescuento,
        envio,
        total,
      };
      const pedido: ConfirmacionPedido = {
        idPedido: respuesta.idPedido,
        nombreComprador: nombreComprador || "lector/a",
        emailComprador: emailActual,
        fecha: new Date().toISOString(),
        metodoEnvio,
        ...(direccionEntrega ? { direccionEntrega } : {}),
        metodoPago,
        items: itemsPedido,
        totalItems,
        ...montos,
      };
      void vaciarCarrito();
      navegar("/confirmacion-compra", {
        state: pedido,
      });
    } catch (error) {
      setErrores({ general: mensajeDeError(error) });
    } finally {
      setProcesando(false);
    }
  }

  // Mientras se crea el pedido se muestra la pantalla de espera. Los datos
  // del formulario siguen en este componente: si el pago falla, el
  // formulario vuelve con todo lo escrito y el mensaje de error.
  if (procesando) return <CargandoCompra />;

  // Nombre, apellido y teléfono: van en el formulario de despacho y en
  // "Datos de quien retira"
  const camposContacto = {
    nombre: (
      <Campo id="checkout-nombre" etiqueta="Nombre" error={errores.nombre}>
        <input
          type="text"
          id="checkout-nombre"
          placeholder="Nombre"
          autoComplete="given-name"
          value={contacto.nombre}
          onChange={(e) => cambiarContacto("nombre", e.target.value)}
        />
      </Campo>
    ),
    apellido: (
      <Campo id="checkout-apellido" etiqueta="Primer apellido" error={errores.apellido}>
        <input
          type="text"
          id="checkout-apellido"
          placeholder="Primer apellido"
          autoComplete="family-name"
          value={contacto.apellido}
          onChange={(e) => cambiarContacto("apellido", e.target.value)}
        />
      </Campo>
    ),
    telefono: (
      <Campo id="checkout-telefono" etiqueta="Teléfono" error={errores.telefono}>
        <input
          type="tel"
          id="checkout-telefono"
          placeholder="+56912345678"
          autoComplete="tel"
          value={contacto.telefono}
          onChange={(e) => cambiarContacto("telefono", e.target.value)}
        />
      </Campo>
    ),
  };

  // Formulario de la dirección de despacho (Figma: Información de envío)
  const formularioDireccion = (
    <div className="checkout-formulario-direccion">
      {camposContacto.nombre}
      {camposContacto.apellido}
      <div className="checkout-fila checkout-fila-direccion">
        <Campo id="checkout-direccion" etiqueta="Dirección" error={errores.direccion}>
          <input
            type="text"
            id="checkout-direccion"
            placeholder="Dirección"
            autoComplete="address-line1"
            value={direccion.direccion}
            onChange={(e) => cambiarDireccion("direccion", e.target.value)}
          />
        </Campo>
        <Campo id="checkout-numero" etiqueta="Numeración" error={errores.numero}>
          <input
            type="text"
            id="checkout-numero"
            placeholder="Numeración"
            value={direccion.numero}
            onChange={(e) => cambiarDireccion("numero", e.target.value)}
          />
        </Campo>
      </div>
      <Campo id="checkout-depto" etiqueta="Depto, oficina, casa" error={errores.depto}>
        <input
          type="text"
          id="checkout-depto"
          placeholder="Depto, oficina, casa"
          autoComplete="address-line2"
          value={direccion.depto}
          onChange={(e) => cambiarDireccion("depto", e.target.value)}
        />
      </Campo>
      <Campo id="checkout-region" etiqueta="Región" error={errores.region}>
        <select
          id="checkout-region"
          className={direccion.region ? undefined : "checkout-sin-valor"}
          value={direccion.region}
          onChange={(e) => cambiarDireccion("region", e.target.value)}
        >
          <option value="">Región</option>
          {REGIONES.map((region) => (
            <option key={region.codigo}>{region.nombre}</option>
          ))}
        </select>
      </Campo>
      <Campo id="checkout-comuna" etiqueta="Comuna" error={errores.comuna || errorEnvio}>
        <select
          id="checkout-comuna"
          className={direccion.comuna ? undefined : "checkout-sin-valor"}
          value={direccion.comuna}
          disabled={!direccion.region}
          onChange={(e) => cambiarDireccion("comuna", e.target.value)}
        >
          <option value="">Comuna</option>
          {comunasDe(direccion.region).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Campo>
      {camposContacto.telefono}
      <p className="checkout-nota-obligatorios">
        Los campos marcados con (<span className="checkout-obligatorio">*</span>) son
        obligatorios.
      </p>
    </div>
  );

  return (
    <>
      <main className="checkout">
        <div className="checkout-contenedor">
          <RutaNavegacion elementos={RUTA} className="checkout-ruta" />

          <form className="checkout-formulario" onSubmit={pagar} noValidate>
            {/*SESIÓN: bienvenida, inicio de sesión o compra como invitado*/}
            {usuario ? (
              <section className="checkout-bienvenida">
                <p>
                  Ya puedes realizar tu compra, <strong>{usuario.nombre}</strong>
                </p>
              </section>
            ) : esInvitado ? (
              <section className="checkout-tarjeta checkout-invitado" aria-labelledby="checkout-titulo-invitado">
                <div className="checkout-encabezado-tarjeta">
                  <h2 id="checkout-titulo-invitado">Comprar como invitado</h2>
                  <p>
                    Para comprar como <strong>invitado</strong> debes rellenar tus datos
                    personales
                  </p>
                </div>
                <Campo id="checkout-email-invitado" etiqueta="Correo electrónico" error={errores.emailInvitado}>
                  <input
                    type="email"
                    id="checkout-email-invitado"
                    placeholder="ejemplo@gmail.com"
                    autoComplete="email"
                    value={emailInvitado}
                    onChange={(e) => setEmailInvitado(e.target.value)}
                  />
                </Campo>
              </section>
            ) : (
              <section className="checkout-login" aria-labelledby="checkout-titulo-login">
                <div className="checkout-login-saludo">
                  <h2 id="checkout-titulo-login">
                    ¡Hola, <span>lector!</span>
                  </h2>
                  <p>Inicia sesión para descubrir buenas lecturas.</p>
                </div>
                <div className="checkout-login-campos">
                  <div className="checkout-campo checkout-campo-redondo">
                    <label htmlFor="checkout-email">Correo electrónico</label>
                    <input
                      type="email"
                      id="checkout-email"
                      placeholder="Correo electrónico"
                      autoComplete="email"
                      value={login.email}
                      onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    />
                    {erroresLogin.email && <span className="checkout-error">{erroresLogin.email}</span>}
                  </div>
                  <div className="checkout-campo checkout-campo-redondo">
                    <label htmlFor="checkout-password">Contraseña</label>
                    <div className="checkout-campo-con-boton">
                      <input
                        type={verPassword ? "text" : "password"}
                        id="checkout-password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                      />
                      <button
                        type="button"
                        aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        aria-pressed={verPassword}
                        onClick={() => setVerPassword((ver) => !ver)}
                      >
                        <Icono nombre={verPassword ? "ver" : "ocultar"} />
                      </button>
                    </div>
                    {erroresLogin.password && (
                      <span className="checkout-error">{erroresLogin.password}</span>
                    )}
                  </div>
                  {erroresLogin.general && <span className="checkout-error">{erroresLogin.general}</span>}
                  <p className="checkout-login-recuperar">
                    <Link to="/mi-cuenta">¿Olvidaste tu contraseña?</Link>
                  </p>
                </div>
                <div className="checkout-login-acciones">
                  <button
                    type="button"
                    className="checkout-boton-principal"
                    disabled={cargandoLogin}
                    onClick={() => void manejarLogin()}
                  >
                    {cargandoLogin ? "Ingresando..." : "Iniciar sesión"}
                  </button>
                  <p className="checkout-login-alternativas">
                    ¿Aún no tienes cuenta? <Link to="/mi-cuenta">Regístrate aquí</Link>
                    <span aria-hidden="true">o</span>
                    <button type="button" className="checkout-enlace" onClick={cambiarAInvitado}>
                      compra como invitado
                    </button>
                  </p>
                </div>
                <div className="checkout-social-separador">
                  <span>O continúa con</span>
                </div>
                <div className="checkout-social">
                  <button type="button">
                    <Icono nombre="google" />
                    Continuar con Google
                  </button>
                  <button type="button">
                    <Icono nombre="facebook" />
                    Continuar con Facebook
                  </button>
                </div>
                {errores.sesion && <span className="checkout-error">{errores.sesion}</span>}
              </section>
            )}

            {/*MÉTODO DE ENVÍO*/}
            <section className="checkout-tarjeta" aria-labelledby="checkout-titulo-envio">
              <h2 id="checkout-titulo-envio">Método de envío</h2>
              <div className="checkout-envio-opciones">
                <label className="checkout-envio-opcion">
                  <input
                    type="radio"
                    name="metodo-envio"
                    checked={metodoEnvio === "despacho"}
                    onChange={() => setMetodoEnvio("despacho")}
                  />
                  <Icono nombre="envio" />
                  <span>Despacho a domicilio</span>
                </label>
                <label className="checkout-envio-opcion">
                  <input
                    type="radio"
                    name="metodo-envio"
                    checked={metodoEnvio === "retiro"}
                    onChange={() => setMetodoEnvio("retiro")}
                  />
                  <Icono nombre="tienda" />
                  <span>Retiro en tienda</span>
                </label>
              </div>
            </section>

            {/*INFORMACIÓN DE ENVÍO: dirección guardada (con la opción de agregar una nueva) o formulario*/}
            {metodoEnvio === "despacho" && guardada && usuario && (
              <section className="checkout-tarjeta" aria-labelledby="checkout-titulo-direccion">
                <div className="checkout-encabezado-tarjeta">
                  <h2 id="checkout-titulo-direccion">Información de envío</h2>
                  <p>Dirección de entrega</p>
                </div>
                <div className="checkout-direcciones">
                  <label className="checkout-direccion-guardada">
                    <input
                      type="radio"
                      name="direccion-entrega"
                      checked={usarGuardada}
                      onChange={() => setUsarGuardada(true)}
                    />
                    <span>
                      <strong>
                        {usuario.nombre} {usuario.apellido}
                      </strong>
                      {guardada.direccion} {guardada.numero}, {guardada.comuna}, Chile, Tel:{" "}
                      {guardada.telefono}
                    </span>
                  </label>
                  <button
                    type="button"
                    className="checkout-enlace checkout-nueva-direccion"
                    aria-expanded={!usarGuardada}
                    onClick={() => setUsarGuardada((usar) => !usar)}
                  >
                    Agrega una nueva dirección de envío
                    <Icono nombre={usarGuardada ? "siguiente" : "abajo"} />
                  </button>
                </div>
                {!usarGuardada && (
                  <div className="checkout-tarjeta checkout-tarjeta-anidada">
                    <h3>Información de envío</h3>
                    {formularioDireccion}
                  </div>
                )}
              </section>
            )}
            {pideDireccion && !guardada && (
              <section className="checkout-tarjeta" aria-labelledby="checkout-titulo-direccion">
                <h2 id="checkout-titulo-direccion">Información de envío</h2>
                {formularioDireccion}
              </section>
            )}

            {/*DATOS DE QUIEN RETIRA: el invitado que retira en tienda (sin diseño en Figma)*/}
            {pideDatosRetiro && (
              <section className="checkout-tarjeta" aria-labelledby="checkout-titulo-retiro">
                <div className="checkout-encabezado-tarjeta">
                  <h2 id="checkout-titulo-retiro">Datos de quien retira</h2>
                  <p>Los pediremos al entregar tu compra en la tienda</p>
                </div>
                <div className="checkout-formulario-direccion">
                  {camposContacto.nombre}
                  {camposContacto.apellido}
                  {camposContacto.telefono}
                </div>
              </section>
            )}

            {/*MÉTODO DE PAGO*/}
            <section className="checkout-tarjeta" aria-labelledby="checkout-titulo-pago">
              <div className="checkout-encabezado-tarjeta">
                <h2 id="checkout-titulo-pago">Método de pago</h2>
                <p>¿Cómo vas a efectuar el pago?</p>
              </div>
              <div className="checkout-pago-opciones">
                {METODOS_PAGO.map((m) => (
                  <div className="checkout-pago-opcion" key={m.valor}>
                    <label className="checkout-pago-fila">
                      <input
                        type="radio"
                        name="metodo-pago"
                        checked={metodoPago === m.valor}
                        onChange={() => setMetodoPago(m.valor)}
                      />
                      <span className="checkout-pago-nombre">{m.nombre}</span>
                      {m.logo && <img className="checkout-logo" src={m.logo} alt="" />}
                    </label>
                    {m.valor === "onepay" && (
                      <div className="checkout-pago-detalle">
                        <Link to="/mi-cuenta">Registra tu tarjeta aquí</Link>
                        <p>
                          <Icono nombre="informacion" />
                          Tus tarjetas se guardan de forma segura para que puedas reutilizar el
                          método de pago
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </form>

          {/*RESUMEN DEL PEDIDO*/}
          <aside className="checkout-resumen" aria-labelledby="checkout-titulo-resumen">
            <div className="checkout-resumen-encabezado">
              <h2 id="checkout-titulo-resumen">Resumen del pedido</h2>
              <span>
                {totalItems} {totalItems === 1 ? "elemento" : "elementos"}
              </span>
            </div>

            {items.length === 0 && (
              <p className="checkout-resumen-vacio">
                Tu carrito está vacío. <Link to="/catalogo">Ir al catálogo</Link>
              </p>
            )}
            {items.length > 0 && (
              <ul className="checkout-resumen-items">
                {items.map((item) => (
                  <li className="checkout-resumen-item" key={item.idLibro}>
                    <Portada className="checkout-resumen-foto" src={item.portada} alt="" />
                    <div className="checkout-resumen-datos">
                      <p className="checkout-resumen-titulo">{item.titulo}</p>
                      {item.autor && <p className="checkout-resumen-autor">{item.autor}</p>}
                      <p>
                        {item.cantidad} {item.cantidad === 1 ? "unidad" : "unidades"}
                      </p>
                    </div>
                    <div className="checkout-resumen-precio">
                      {montoDescuento > 0 && (
                        <s>{formatearPrecio(item.precioUnitario * item.cantidad)}</s>
                      )}
                      <span className={montoDescuento > 0 ? "checkout-precio-oferta" : undefined}>
                        {formatearPrecio(
                          Math.round(
                            item.precioUnitario *
                              item.cantidad *
                              (1 - montoDescuento / (subtotal || 1)),
                          ),
                        )}
                      </span>
                      <button
                        type="button"
                        className="checkout-resumen-eliminar"
                        aria-label={`Eliminar ${item.titulo} del carrito`}
                        onClick={() => setIdPorEliminar(item.idLibro)}
                      >
                        Eliminar
                        <Icono nombre="papelera" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="checkout-descuento">
              <div className="checkout-descuento-campo">
                <input
                  type="text"
                  placeholder="Código de descuento"
                  aria-label="Código de descuento"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
                <Icono nombre="cupon" />
              </div>
              <button type="button" onClick={aplicarCodigo} disabled={!codigo.trim()}>
                Aplicar
              </button>
            </div>
            {errorCodigo && <span className="checkout-error">{errorCodigo}</span>}

            <dl className="checkout-resumen-filas">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatearPrecio(subtotal)}</dd>
              </div>
              <div className={montoDescuento > 0 ? "checkout-resumen-descuento" : undefined}>
                <dt>Descuento</dt>
                <dd>-{formatearPrecio(montoDescuento)}</dd>
              </div>
              <div>
                <dt>
                  Envío
                  {datosEnvio &&
                    ` (llega en ${datosEnvio.diasEstimados} ${datosEnvio.diasEstimados === 1 ? "día" : "días"})`}
                </dt>
                <dd>{textoEnvio}</dd>
              </div>
            </dl>

            <div className="checkout-total">
              <span>Total</span>
              <span className="checkout-total-monto">{formatearPrecio(total)}</span>
            </div>

            <label className="checkout-terminos">
              <input
                type="checkbox"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
              />
              <span>He leído y acepto los términos y condiciones.</span>
            </label>
            {errores.terminos && <span className="checkout-error">{errores.terminos}</span>}
            {errores.items && <span className="checkout-error">{errores.items}</span>}
            {errores.general && (
              // Si el pago falla, el formulario vuelve desde la pantalla de
              // espera: se lleva la vista al mensaje para que se vea
              <span
                className="checkout-error"
                role="alert"
                ref={(mensaje) => mensaje?.scrollIntoView({ block: "center" })}
              >
                {errores.general}
              </span>
            )}
            {/* En el diseño, el botón queda gris hasta aceptar los términos */}
            <button
              className="checkout-boton-principal checkout-pagar"
              type="button"
              disabled={procesando || !terminos}
              onClick={() => void pagar()}
            >
              {procesando ? "Procesando..." : "Pagar ahora"}
            </button>
          </aside>
        </div>

        {idPorEliminar !== null && (
          <ConfirmarEliminar
            idLibro={idPorEliminar}
            titulo={items.find((item) => item.idLibro === idPorEliminar)?.titulo ?? ""}
            onCerrar={() => setIdPorEliminar(null)}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Checkout;
