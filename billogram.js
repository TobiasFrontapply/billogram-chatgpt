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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_TO,
      subject: `✅ Faktura betald: #${invoiceNo}`,
      text: `Faktura #${invoiceNo} har betalats med ${amount} kr den ${date}.`
    });

    return res.status(200).send("E-post skickat!");
  }

  res.status(200).send("Callback mottagen.");
}
