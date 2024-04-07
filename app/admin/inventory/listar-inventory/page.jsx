"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Toast } from "primereact/toast";

const InventoryPage = () => {
  const toast = useRef(null);
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [adminSite, setAdminSite] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.idSite) {
      setAdminSite(user.idSite);
      fetchInventoryProducts(user.idSite);
    }
  }, []);

  const fetchInventoryProducts = (idSite) => {
    axios
      .get(`http://127.0.0.1:8000/get/inventory-products?idSite=${idSite}`)
      .then((response) => {
        setInventoryProducts(response.data.resultado);
      })
      .catch((error) => {
        console.error("Error al obtener el inventario de productos:", error);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <h2>Inventario de Productos</h2>
      <Table aria-label="Inventario de productos" className="CustomTable">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Sede</TableColumn>
          <TableColumn>ID de Producto</TableColumn>
        </TableHeader>
        <TableBody>
          {inventoryProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {product.idSite === 1
                  ? "Sede 1"
                  : product.idSite === 2
                  ? "Sede 2"
                  : product.idSite === 3
                  ? "Sede 3"
                  : null}
              </TableCell>
              <TableCell>{product.idProduct}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default InventoryPage;
