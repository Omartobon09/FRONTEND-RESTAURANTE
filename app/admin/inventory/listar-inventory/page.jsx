"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const InventoryProductsPage = () => {
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://127.0.0.1:8000/get/inventory-products?idSite=${user.idSite}`
        )
        .then((response) => {
          setInventoryProducts(response.data.resultado);
        })
        .catch((error) => {
          console.error("Error al obtener los productos de inventario:", error);
          setInventoryProducts([]);
        });
    }
  }, [user]);

  const handleEditClick = (idProduct) => {
    localStorage.setItem("productId", idProduct);
    window.location.href = `/admin/inventory/edit-productos`;
  };

  return (
    <>
      <h2>Productos de Inventario</h2>
      <Table
        aria-label="Lista de productos de inventario"
        className="CustomTable"
      >
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Unidad</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.isArray(inventoryProducts) &&
            inventoryProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.NameProduct}</TableCell>
                <TableCell>{product.Unit}</TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditClick(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default InventoryProductsPage;
