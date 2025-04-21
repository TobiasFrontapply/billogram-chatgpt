import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { event_type, data } = req.body;

  if (event_type === "payment") {
    const invoiceNo = data.invoice_no;
    const amount = data.amount;
    const date = data.date;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.frontapply.chatgtp@gmail.com,
        pass: process.env.Front1353!
      }
    });

    await transporter.sendMail({
      from: process.env.bankskivor@frontapply.se,
      to: process.env.NOTIFY_TO,
      subject: `✅ ${name} faktura betald: #${invoiceNo}`,
      text: `Faktura #${invoiceNo} från ${name} har betalats med ${amount} kr den ${date}.`
    });

    return res.status(200).send("E-post skickat!");
  }

  res.status(200).send("Callback mottagen.");
}
