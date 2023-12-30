import QRCodeGenerator from "@/components/QRCodeGenerator";

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <QRCodeGenerator />
    </div>
  )
}
