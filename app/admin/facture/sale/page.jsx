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
    axios.get("http://127.0.0.1:8000/get/facture/sale").then((response) => {
      const filteredSale = response.data.resuultado.filter(
        (sale) => sale.idSite === adminSite && sale.idUser === adminUser
      );
      setSale(filteredSale);
    });
  };

  const handleEditSale = (idInvoice) => {
    localStorage.setItem("invoiceId", idInvoice);
    router.push(`/admin/facture/sale`);
  };

  const handlePrintSale = (idInvoice) => {
    const printWindows = window.open("", "_blank");
    printWindows.document.write(`html><head><title>Factura</title></head><body>${(idInvoice)}</body></html>`)
    printWindows.document.close()
    printWindows.print()
  }

  const generateFacture = (idInvoce) => {
    //Aqui debemos colocar el HTML de la factura bebe

    return `<h1>Factura</h1> <p>Código de Factura ${idInvoce}</p>`
  }

  useEffect(() => {
    getPendientFactur();
  }, [adminSite, adminUser])

  return (
    <>
      <h2>Lista de factura</h2>
      <Table aria-label="Lista de factura" className="CustomTable">
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
                <TableCell>{sale.idOrder}</TableCell>
                <TableCell>{sale.TotalAmount}</TableCell>
                <TableCell>{sale.Discount}</TableCell>
                <TableCell>{sale.PaymentStatus}</TableCell>
                <TableCell>{sale.PaymentDate}</TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditSale(sale.idSale)}
                  />
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePrintSale(sale.idInvoice)}
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
