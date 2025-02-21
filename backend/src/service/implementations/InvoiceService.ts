import { injectable } from "inversify";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { IUser } from "../../models/interfaces/IUser";
import { ITransaction } from "../../models/interfaces/ITransaction";
import { IInvoiceService } from "../interfaces/IInvoiceService";

@injectable()
export class InvoiceService implements IInvoiceService {
  async generateInvoice(
    user: IUser,
    transaction: ITransaction
  ): Promise<string> {
    const doc = new PDFDocument();
    const invoicePath = path.join(
      __dirname,
      `../../../assets/invoices/${transaction._id}.pdf`
    );

    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(invoicePath);
      doc.pipe(stream);

      doc.image(
        path.join(__dirname, "../../../assets/company-logo.png"),
        50,
        50,
        {
          width: 150,
        }
      );
      doc.fontSize(20).text("Invoice", 400, 50);

      doc.fontSize(14).text(`Invoice ID: ${transaction._id}`, 50, 120);
      doc.text(
        `User: ${user.firstName} ${user.lastName} (${user.email})`,
        50,
        140
      );
      doc.text(`Amount: $${(transaction.amount / 100).toFixed(2)}`, 50, 160);
      doc.text(`Currency: ${transaction.currency.toUpperCase()}`, 50, 180);
      doc.text(`Payment Status: ${transaction.status}`, 50, 200);

      doc.text("Authorized Signature:", 50, 300);
      doc.image(
        path.join(__dirname, "../../../assets/signature.png"),
        50,
        320,
        { width: 100 }
      );

      doc.end();
      stream.on("finish", () => resolve(invoicePath));
      stream.on("error", (err) => reject(err));
    });
  }
}
