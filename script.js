const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

const state = {
  ventas: [],
  compras: [],
  metas: {
    carne: 0,
    cebolla: 0,
    papas: 0,
    maiz: 0,
    domi: 0,
  },
};

const refs = {
  ventaForm: document.getElementById("ventaForm"),
  compraForm: document.getElementById("compraForm"),
  metaForm: document.getElementById("metaForm"),
  ventasBody: document.querySelector("#tablaVentas tbody"),
  comprasBody: document.querySelector("#tablaCompras tbody"),
  insumosBody: document.getElementById("tablaInsumosBody"),
};

function toMoney(value) {
  return money.format(value || 0);
}

function renderVentas() {
  refs.ventasBody.innerHTML = "";
  let totalVentas = 0;
  let totalCantidad = 0;
  let totalCarne = 0;
  let totalCebolla = 0;
  let totalPapas = 0;
  let totalMaiz = 0;
  let totalDomi = 0;

  state.ventas.forEach((venta) => {
    totalVentas += venta.monto;
    totalCantidad += venta.cantidad;
    totalCarne += venta.carne;
    totalCebolla += venta.cebolla;
    totalPapas += venta.papas;
    totalMaiz += venta.maiz;
    totalDomi += venta.domi;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${venta.fecha}</td>
      <td>${toMoney(venta.monto)}</td>
      <td>${venta.cantidad}</td>
      <td>${venta.carne}</td>
      <td>${venta.cebolla}</td>
      <td>${venta.papas}</td>
      <td>${venta.maiz}</td>
      <td>${venta.domi}</td>
    `;
    refs.ventasBody.appendChild(row);
  });

  document.getElementById("totalVentas").textContent = toMoney(totalVentas);
  document.getElementById("totalCantidad").textContent = totalCantidad;
  document.getElementById("totalCarne").textContent = totalCarne;
  document.getElementById("totalCebolla").textContent = totalCebolla;
  document.getElementById("totalPapas").textContent = totalPapas;
  document.getElementById("totalMaiz").textContent = totalMaiz;
  document.getElementById("totalDomi").textContent = totalDomi;

  return {
    totalVentas,
    totalCarne,
    totalCebolla,
    totalPapas,
    totalMaiz,
    totalDomi,
  };
}

function renderCompras() {
  refs.comprasBody.innerHTML = "";
  let totalCompras = 0;

  state.compras.forEach((compra) => {
    totalCompras += compra.monto;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${compra.fecha}</td>
      <td>${compra.motivo}</td>
      <td>${toMoney(compra.monto)}</td>
    `;
    refs.comprasBody.appendChild(row);
  });

  document.getElementById("totalCompras").textContent = toMoney(totalCompras);
  return totalCompras;
}

function renderInsumos(consumo) {
  const labels = {
    carne: "Carne",
    cebolla: "Cebolla",
    papas: "Papas",
    maiz: "Maíz",
    domi: "Domi",
  };

  refs.insumosBody.innerHTML = "";
  let totalMeta = 0;

  Object.keys(state.metas).forEach((key) => {
    totalMeta += state.metas[key];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${labels[key]}</td>
      <td>${toMoney(state.metas[key])}</td>
      <td>${consumo[key]}</td>
    `;
    refs.insumosBody.appendChild(row);
  });

  document.getElementById("totalMetaInsumos").textContent = toMoney(totalMeta);
  return totalMeta;
}

function renderResumen() {
  const consumo = renderVentas();
  const totalCompras = renderCompras();
  const totalMeta = renderInsumos(consumo);

  const balance = consumo.totalVentas - totalCompras;
  const balanceFinal = balance - totalMeta;

  document.getElementById("resVentas").textContent = toMoney(consumo.totalVentas);
  document.getElementById("resCompras").textContent = toMoney(totalCompras);
  document.getElementById("resBalance").textContent = toMoney(balance);
  document.getElementById("resMeta").textContent = toMoney(totalMeta);
  document.getElementById("resFinal").textContent = toMoney(balanceFinal);
}

refs.ventaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = (id) => document.getElementById(id).value;
  state.ventas.push({
    fecha: input("fechaVenta"),
    monto: Number(input("montoVenta")),
    cantidad: Number(input("cantidadVenta")),
    carne: Number(input("carneVenta")),
    cebolla: Number(input("cebollaVenta")),
    papas: Number(input("papasVenta")),
    maiz: Number(input("maizVenta")),
    domi: Number(input("domiVenta")),
  });

  refs.ventaForm.reset();
  renderResumen();
});

refs.compraForm.addEventListener("submit", (event) => {
  event.preventDefault();

  state.compras.push({
    fecha: document.getElementById("fechaCompra").value,
    motivo: document.getElementById("motivoCompra").value,
    monto: Number(document.getElementById("montoCompra").value),
  });

  refs.compraForm.reset();
  renderResumen();
});

refs.metaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  state.metas.carne = Number(document.getElementById("metaCarne").value);
  state.metas.cebolla = Number(document.getElementById("metaCebolla").value);
  state.metas.papas = Number(document.getElementById("metaPapas").value);
  state.metas.maiz = Number(document.getElementById("metaMaiz").value);
  state.metas.domi = Number(document.getElementById("metaDomi").value);

  renderResumen();
});

renderResumen();
