import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../estilos/checkout.css";
import logoOnepay from "../assets/logos/onepay-transbank.png";
import logoWebpay from "../assets/logos/webpay-transbank.svg";
import logoMercadoPago from "../assets/logos/mercado-pago.png";
import { Icono } from "../componentes/Icono";
import { Portada } from "../componentes/Portada";
import { usePeticion } from "../componentes/usePeticion";
import { useTituloPagina } from "../componentes/useTituloPagina";
import { REGIONES, comunasDe } from "../datos/regiones";
import { resumenCarrito, useCarritoStore } from "../estado/carritoStore";
import { useSesionStore } from "../estado/sesionStore";
import { REGEX_EMAIL } from "../utils/validacion";
import { quitarDelCarrito, vaciarCarrito } from "../servicios/carritoServicio";
import {
  cotizarEnvio,
  crearPedido,
  iniciarSesion,
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

const METODOS_PAGO: { valor: MetodoPago; nombre: string; logo?: string }[] = [
  { valor: "onepay", nombre: "Onepay - Débito, crédito y prepago", logo: logoOnepay },
  { valor: "webpay", nombre: "Webpay - Débito, crédito y prepago", logo: logoWebpay },
  { valor: "mercadopago", nombre: "Mercado pago - Débito, crédito y prepago", logo: logoMercadoPago },
  { valor: "transferencia", nombre: "Transferencia electrónica" },
];

const REGEX_TELEFONO = /^\+?[0-9\s]{8,15}$/;
// Celular chileno que exige la API para despachar (ej. +56912345678)
const REGEX_CELULAR = /^(\+?56)?9\d{8}$/;

type Errores = Record<string, string>;

function Checkout() {
  useTituloPagina("Checkout");
  const navegar = useNavigate();
  const items = useCarritoStore((e) => e.items);
  const { usuario, invitado, iniciar, continuarComoInvitado, cerrar } =
    useSesionStore();

  const [login, setLogin] = useState({ email: "", password: "" });
  const [erroresLogin, setErroresLogin] = useState<Errores>({});
  const [cargandoLogin, setCargandoLogin] = useState(false);
  const [datosInvitado, setDatosInvitado] = useState({ email: "", telefono: "" });

  const [metodoEnvio, setMetodoEnvio] = useState<MetodoEnvio>("despacho");
  const [direccion, setDireccion] = useState({
    direccion: "",
    numero: "",
    depto: "",
    region: "",
    comuna: "",
    telefono: "",
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
  const montoDescuento = descuento
    ? Math.round((subtotal * descuento.porcentaje) / 100)
    : 0;
  const emailActual =
    usuario?.email ?? (invitado ? datosInvitado.email : login.email);
  const guardada = usuario?.direccionGuardada;
  const usandoGuardada = Boolean(guardada) && usarGuardada;
  const sesionLista = Boolean(usuario) || invitado;

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

  function cambiarALogin() {
    setUsarGuardada(true);
    setErrores((e) => ({ ...e, emailInvitado: "", telefonoInvitado: "", sesion: "" }));
    cerrar();
  }

  async function aplicarCodigo() {
    setErrorCodigo("");
    try {
      setDescuento(await validarDescuento(codigo));
    } catch (err) {
      setDescuento(null);
      setErrorCodigo((err as Error).message);
    }
  }

  function cambiarDireccion(campo: string, valor: string) {
    setDireccion((d) => ({
      ...d,
      [campo]: valor,
      ...(campo === "region" ? { comuna: "" } : {}),
    }));
  }

  async function pagar(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    const nuevos: Errores = {};
    if (!sesionLista) {
      nuevos.sesion = "Inicia sesión o continúa como invitado";
    }
    if (invitado && !usuario) {
      if (!REGEX_EMAIL.test(datosInvitado.email)) nuevos.emailInvitado = "Correo inválido";
      if (!REGEX_TELEFONO.test(datosInvitado.telefono)) {
        nuevos.telefonoInvitado = "Ingresa un teléfono válido";
      }
    }
    if (!items.length) nuevos.items = "Tu carrito está vacío";
    if (metodoEnvio === "despacho" && !usandoGuardada) {
      if (!direccion.direccion.trim()) nuevos.direccion = "Campo obligatorio";
      if (!direccion.numero.trim()) nuevos.numero = "Campo obligatorio";
      if (!direccion.depto.trim()) nuevos.depto = "Campo obligatorio";
      if (!direccion.region) nuevos.region = "Selecciona una región";
      if (!direccion.comuna) nuevos.comuna = "Selecciona una comuna";
      if (usuario && !REGEX_CELULAR.test(direccion.telefono.replace(/\s/g, ""))) {
        nuevos.telefono = "Ingresa un celular válido, por ejemplo +56912345678";
      }
    }
    if (metodoEnvio === "despacho" && errorEnvio) nuevos.comuna = errorEnvio;
    if (!terminos) nuevos.terminos = "Debes aceptar los términos";
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;

    setProcesando(true);
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
      const telefono =
        invitado && !usuario
          ? datosInvitado.telefono
          : usandoGuardada
            ? guardada?.telefono
            : direccion.telefono;
      const respuesta = await crearPedido({
        email: emailActual,
        nombreReceptor: usuario ? `${usuario.nombre} ${usuario.apellido}`.trim() : undefined,
        telefono,
        metodoEnvio,
        ...(direccionEntrega ?? {}),
        metodoPago,
        codigoDescuento: descuento?.codigo,
        items: items.map((i) => ({ idLibro: i.idLibro, cantidad: i.cantidad })),
      });
      const pedido: ConfirmacionPedido = {
        idPedido: respuesta.idPedido,
        nombreComprador: usuario
          ? `${usuario.nombre} ${usuario.apellido}`
          : "lector/a",
        emailComprador: emailActual,
        fecha: new Date().toISOString(),
        metodoEnvio,
        ...(direccionEntrega ? { direccionEntrega } : {}),
        metodoPago,
        items: itemsPedido,
        totalItems,
        subtotal,
        envio,
        descuento: montoDescuento,
        total,
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

  return (
    <main className="checkout">

      <div className="checkout-contenedor">
        <form className="checkout-formulario" onSubmit={pagar} noValidate>
          <nav className="checkout-breadcrumb" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/catalogo">Carrito</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Check out</span>
        </nav>
          {/*INICIAR SESIÓN*/}
          <section className={`checkout-tarjeta${usuario ? " checkout-bienvenida" : ""}`}>
            {!usuario && <h2 className="checkout-titulo-invitado">
              {invitado && !usuario ? "Comprar como invitado" : "Iniciar sesión"}
            </h2>}
            {usuario ? (
              <p>
                Ya puedes realizar tu compra, <strong>{usuario.nombre}</strong>{" "}
                <button type="button" className="checkout-enlace" onClick={cambiarALogin}>
                  Cerrar sesión
                </button>
              </p>
            ) : invitado ? (
              <>
                <p className="checkout-subtitulo checkout-instruccion-invitado">
                  Para comprar como <strong>invitado</strong> debes rellenar tus
                  datos personales
                </p>
                <div className="checkout-campo">
                  <label htmlFor="checkout-email-invitado">Dirección de correo*</label>
                  <input
                    type="email"
                    id="checkout-email-invitado"
                    autoComplete="email"
                    value={datosInvitado.email}
                    onChange={(e) =>
                      setDatosInvitado({ ...datosInvitado, email: e.target.value })
                    }
                  />
                  {errores.emailInvitado && (
                    <span className="checkout-error">{errores.emailInvitado}</span>
                  )}
                </div>
                <div className="checkout-campo">
                  <label htmlFor="checkout-telefono-invitado">Número de teléfono*</label>
                  <input
                    type="tel"
                    id="checkout-telefono-invitado"
                    autoComplete="tel"
                    value={datosInvitado.telefono}
                    onChange={(e) =>
                      setDatosInvitado({ ...datosInvitado, telefono: e.target.value })
                    }
                  />
                  {errores.telefonoInvitado && (
                    <span className="checkout-error">
                      {errores.telefonoInvitado}
                    </span>
                  )}
                </div>
                <p className="checkout-login-ayuda">
                  ¿Ya tienes cuenta?{" "}
                  <button type="button" className="checkout-enlace" onClick={cambiarALogin}>
                    INICIAR SESIÓN
                  </button>
                </p>
              </>
            ) : (
              <>
                <div className="checkout-campo">
                  <label htmlFor="checkout-email">Correo electrónico</label>
                  <input
                    type="email"
                    id="checkout-email"
                    autoComplete="email"
                    value={login.email}
                    onChange={(e) => setLogin({ ...login, email: e.target.value })}
                  />
                  {erroresLogin.email && (
                    <span className="checkout-error">{erroresLogin.email}</span>
                  )}
                </div>
                <div className="checkout-campo">
                  <label htmlFor="checkout-password">Contraseña</label>
                  <input
                    type="password"
                    id="checkout-password"
                    autoComplete="current-password"
                    value={login.password}
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                  />
                  {erroresLogin.password && (
                    <span className="checkout-error">
                      {erroresLogin.password}
                    </span>
                  )}
                </div>
                {erroresLogin.general && (
                  <span className="checkout-error">{erroresLogin.general}</span>
                )}
                <button
                  type="button"
                  className="checkout-boton-login"
                  disabled={cargandoLogin}
                  onClick={() => void manejarLogin()}
                >
                  {cargandoLogin ? "Ingresando..." : "Iniciar sesión"}
                </button>
                <p className="checkout-login-ayuda">
                  <Link to="/mi-cuenta">¿Olvidaste tu cuenta?</Link>
                </p>
                <p className="checkout-login-ayuda">
                  También puedes <Link to="/mi-cuenta">CREAR UNA CUENTA</Link> o{" "}
                  <button
                    type="button"
                    className="checkout-enlace"
                    onClick={cambiarAInvitado}
                  >
                    COMPRAR COMO INVITADO
                  </button>
                </p>
              </>
            )}
            {errores.sesion && (
              <span className="checkout-error">{errores.sesion}</span>
            )}
          </section>

          {/*MÉTODO DE ENVÍO*/}
          <section className="checkout-envio">
            <h2 className="checkout-titulo-seccion">Método de envío</h2>
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

          {/*INFORMACIÓN DE ENVÍO*/}
          {metodoEnvio === "despacho" && usandoGuardada && guardada && usuario && (
            <section className="checkout-tarjeta">
              <h2>Información de envío</h2>
              <p className="checkout-subtitulo">Dirección de entrega</p>
              <label className="checkout-direccion-guardada">
                <input type="radio" name="direccion-guardada" checked readOnly />
                <span>
                  <strong>{usuario.nombre} {usuario.apellido}</strong>
                  <br />
                  {guardada.direccion} {guardada.numero}, {guardada.comuna}, Chile, Tel: {guardada.telefono}
                </span>
              </label>
              <button
                type="button"
                className="checkout-enlace checkout-nueva-direccion"
                onClick={() => setUsarGuardada(false)}
              >
                Agrega una nueva dirección de envío
              </button>
            </section>
          )}
          {metodoEnvio === "despacho" && !usandoGuardada && (
            <section className="checkout-tarjeta">
              <h2>Información de envío</h2>
              {guardada && (
                <button
                  type="button"
                  className="checkout-enlace"
                  onClick={() => setUsarGuardada(true)}
                >
                  Usar mi dirección guardada
                </button>
              )}
              {(
                [
                  ["direccion", "Dirección*", "street-address"],
                  ["numero", "Número*", "off"],
                  ["depto", "Depto, oficina, casa*", "address-line2"],
                ] as const
              ).map(([campo, etiqueta, auto]) => (
                <div className="checkout-campo" key={campo}>
                  <label htmlFor={`checkout-${campo}`}>{etiqueta}</label>
                  <input
                    type="text"
                    id={`checkout-${campo}`}
                    autoComplete={auto}
                    value={direccion[campo]}
                    onChange={(e) => cambiarDireccion(campo, e.target.value)}
                  />
                  {errores[campo] && (
                    <span className="checkout-error">{errores[campo]}</span>
                  )}
                </div>
              ))}
              <div className="checkout-campo">
                <label htmlFor="checkout-region">Región*</label>
                <select
                  id="checkout-region"
                  value={direccion.region}
                  onChange={(e) => cambiarDireccion("region", e.target.value)}
                >
                  <option value="">Región</option>
                  {REGIONES.map((region) => (
                    <option key={region.codigo}>{region.nombre}</option>
                  ))}
                </select>
                {errores.region && (
                  <span className="checkout-error">{errores.region}</span>
                )}
              </div>
              <div className="checkout-campo">
                <label htmlFor="checkout-comuna">Comuna*</label>
                <select
                  id="checkout-comuna"
                  value={direccion.comuna}
                  disabled={!direccion.region}
                  onChange={(e) => cambiarDireccion("comuna", e.target.value)}
                >
                  <option value="">Comuna</option>
                  {comunasDe(direccion.region).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {(errores.comuna || errorEnvio) && (
                  <span className="checkout-error">{errores.comuna || errorEnvio}</span>
                )}
              </div>
              {/* Celular de contacto: la API lo exige para despachar (el
                  invitado ya lo ingresa en sus datos personales) */}
              {usuario && (
                <div className="checkout-campo">
                  <label htmlFor="checkout-telefono">Teléfono*</label>
                  <input
                    type="tel"
                    id="checkout-telefono"
                    autoComplete="tel"
                    placeholder="+56912345678"
                    value={direccion.telefono}
                    onChange={(e) => cambiarDireccion("telefono", e.target.value)}
                  />
                  {errores.telefono && (
                    <span className="checkout-error">{errores.telefono}</span>
                  )}
                </div>
              )}
            </section>
          )}

          {/*MÉTODO DE PAGO*/}
          <section className="checkout-tarjeta">
            <h2 className="checkout-titulo-seccion">Método de pago</h2>
            <p className="checkout-subtitulo">¿Cómo vas a efectuar el pago?</p>
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
                    {m.logo && (
                      <span className="checkout-logo">
                        <img src={m.logo} alt="" />
                      </span>
                    )}
                  </label>
                  {m.valor === "onepay" && (
                    <div className="checkout-pago-detalle">
                      <Link to="/mi-cuenta">Registra tu tarjeta aquí</Link>
                      <p>
                        <Icono nombre="informacion" />
                        Tus tarjetas se guardan de forma segura para que puedas
                        reutilizar el método de pago
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </form>

        {/*RESUMEN DEL PEDIDO*/}
        <aside className="checkout-resumen" aria-label="Resumen del pedido">
          <div className="checkout-resumen-tarjeta">
          <div className="checkout-resumen-encabezado">
            <h2>Resumen del pedido</h2>
            <span className="checkout-resumen-cantidad">
              {totalItems} {totalItems === 1 ? "elemento" : "elementos"}
            </span>
          </div>

          {items.length === 0 && (
            <p>
              Tu carrito está vacío. <Link to="/catalogo">Ir al catálogo</Link>
            </p>
          )}
          {items.map((item) => (
            <div className="checkout-resumen-item" key={item.idLibro}>
              {item.portada ? (
                <Portada
                  className="checkout-resumen-foto"
                  src={item.portada}
                  alt={item.titulo}
                />
              ) : (
                <div className="checkout-resumen-foto">Sin imagen</div>
              )}
              <div className="checkout-resumen-datos">
                <p className="checkout-resumen-titulo">{item.titulo}</p>
                <p>{item.cantidad} unidad(es)</p>
              </div>
              <span className={`checkout-resumen-precio${montoDescuento > 0 ? " checkout-precio-oferta" : ""}`}>
                {montoDescuento > 0 && (
                  <s className="checkout-precio-tachado">
                    {formatearPrecio(item.precioUnitario * item.cantidad)}
                  </s>
                )}
                {formatearPrecio(
                  Math.round(
                    item.precioUnitario * item.cantidad * (1 - montoDescuento / (subtotal || 1)),
                  ),
                )}
                <button
                  type="button"
                  className="checkout-resumen-eliminar"
                  aria-label={`Eliminar ${item.titulo} del carrito`}
                  onClick={() => setIdPorEliminar(item.idLibro)}
                >
                  <Icono nombre="papelera" />
                </button>
              </span>
            </div>
          ))}

          <div className="checkout-descuento">
            <input
              type="text"
              placeholder="Código de descuento"
              aria-label="Código de descuento"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <button type="button" onClick={aplicarCodigo} disabled={!codigo.trim()}>
              Aplicar
            </button>
          </div>
          {errorCodigo && <span className="checkout-error">{errorCodigo}</span>}

          <hr className="checkout-separador" />

          <div className="checkout-resumen-filas">
            <div className="checkout-resumen-fila">
              <span>Subtotal</span>
              <span>{formatearPrecio(subtotal)}</span>
            </div>
            <div className="checkout-resumen-fila">
              <span>Descuento</span>
              <span>-{formatearPrecio(montoDescuento)}</span>
            </div>
            <div className="checkout-resumen-fila">
              <span>
                Envío
                {datosEnvio &&
                  ` (llega en ${datosEnvio.diasEstimados} ${datosEnvio.diasEstimados === 1 ? "día" : "días"})`}
              </span>
              <span>{textoEnvio}</span>
            </div>
          </div>

          <hr className="checkout-separador" />

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
            <span>He leído y acepto los términos y condiciones</span>
          </label>
          {errores.terminos && (
            <span className="checkout-error">{errores.terminos}</span>
          )}
          {errores.items && <span className="checkout-error">{errores.items}</span>}
          {errores.general && (
            <span className="checkout-error">{errores.general}</span>
          )}
          <button
            className="checkout-pagar"
            type="button"
            disabled={procesando}
            onClick={() => void pagar()}
          >
            {procesando ? "Procesando..." : "Pagar ahora"}
          </button>
          </div>
        </aside>
      </div>

      {idPorEliminar !== null && (
        <div
          className="checkout-modal-fondo"
          onClick={() => setIdPorEliminar(null)}
          onKeyDown={(e) => e.key === "Escape" && setIdPorEliminar(null)}
        >
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-eliminar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="checkout-modal-cerrar"
              aria-label="Cerrar"
              autoFocus
              onClick={() => setIdPorEliminar(null)}
            >
              <Icono nombre="cerrar" />
            </button>
            <Icono nombre="papelera" className="checkout-modal-icono" />
            <h2 id="titulo-eliminar">¿Quieres eliminar este producto?</h2>
            <p>
              Este producto se eliminará de tu carrito. Si todavía lo estás
              pensando, puedes guardarlo en tus favoritos para después.
            </p>
            <button
              type="button"
              className="checkout-modal-eliminar"
              onClick={() => {
                void quitarDelCarrito(idPorEliminar);
                setIdPorEliminar(null);
              }}
            >
              Eliminar producto
            </button>
            <button type="button" className="checkout-modal-favoritos">
              Guardar en favoritos
            </button>
            <button
              type="button"
              className="checkout-modal-cancelar"
              onClick={() => setIdPorEliminar(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Checkout;
