import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import WordPressContent from "@/components/WordPressContent"

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
       <WordPressContent pageId={14} /> 
    </div>
  )
}
