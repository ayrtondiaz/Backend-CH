import { Context, helpers } from "../../deps.ts";
import type { Producto } from "../types/producto.ts";
import * as db from "../db/index.ts";

export const findProducto = async (ctx: Context) => {
  try {
    const productos: Producto[] = await db.findProductos();
    ctx.response.body = productos;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const findProductoById = async (ctx: Context) => {
  const productoId = helpers.getQuery(ctx, { mergeParams: true }).productoId;
  try {
    const producto: Producto = await db.findProductoById(productoId);
    ctx.response.body = producto;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createProducto = async (ctx: Context) => {
  try {
    const { nombre, descripcion, precio } = await ctx.request.body().value;
    const createdProducto: Producto = await db.createProducto(
      nombre,
      descripcion,
      precio
    );
    ctx.response.body = createdProducto;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const updateProducto = async (ctx: Context) => {
  try {
    const productoId = helpers.getQuery(ctx, { mergeParams: true }).productoId;
    const { nombre, descripcion, precio } = await ctx.request.body().value;
    const updatedProducto: Producto = await db.updateProducto(
      productoId,
      nombre,
      descripcion,
      precio
    );
    ctx.response.body = updatedProducto;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const deleteProducto = async (ctx: Context) => {
  const productoId = helpers.getQuery(ctx, { mergeParams: true }).productoId;
  try {
    const deletedProducto: Producto = await db.deleteProducto(productoId);
    ctx.response.body = deletedProducto;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};
