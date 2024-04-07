"use client";
import axios from "axios";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SalePage = () => {
  const router = useRouter();
  const [sale, setSale] = useState([]);
  const [adminSite, setAdminSite] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.idSite) {
      setAdminSite(user.idSite);
      setAdminUser(user.idUser);
    }
  }, []);

  const getPendientFacture = () => {
    axios.get("http://127.0.0.1:8000/get/facture/view-order").then((response) => {
      const filteredSale = response.data.resuultado.filter(
        (sale) => sale.idSite === adminSite && sale.idUser === adminUser
      );
      setSale(filteredSale)
    })
  }

   const handleEditClick = (idInvoice) => {
    localStorage.setItem("invoiceId", idInvoice);
    router.push(`/admin/facture/edit-sale`);
  };

  return (
    <>
      <h2>Lista de Ordens</h2>
      <Table aria-label="Lista de Ordens" className="CustomTable">
        <TableHeader>
          <TableColumn>Código Factura</TableColumn>
          <TableColumn>Total a Pagar</TableColumn>
          <TableColumn>Descuento</TableColumn>
          <TableColumn>Total a pagar</TableColumn>
          <TableColumn>Estado de Factura</TableColumn>
          <TableColumn>Fecha de creación</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.isArray(sales) &&
            sales.map((sale) => (
              <TableRow key={product.idSale}>
                <TableCell>{sale.idInvoice}</TableCell>
                <TableCell>{sale.NameProduct}</TableCell>
                <TableCell>{sale.NameProduct}</TableCell>
                <TableCell>{sale.NameProduct}</TableCell>
                <TableCell>{sale.Unit}</TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditClick(sale.idSale)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductPage;
