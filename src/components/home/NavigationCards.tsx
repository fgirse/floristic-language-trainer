import Link from 'next/link'
import { BookOpen, MessageSquare, Play } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const sections = [
  {
    href: '/vokabeln',
    icon: BookOpen,
    title: 'Vokabeln',
    description:
      'Deutsch-Spanisch Wörterbuch für Floristik: Blumen, Werkzeuge, Kundschaft und Verwaltung.',
    color: 'text-primary',
    bg: 'bg-primary/8',
  },
  {
    href: '/redewendungen',
    icon: MessageSquare,
    title: 'Redewendungen',
    description:
      'Typische Sätze für Begrüssung, Beratung, Verkauf und Zahlung — mit Aussprache.',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
  },
  {
    href: '/simulation',
    icon: Play,
    title: 'Gesprächssimulation',
    description:
      'Übe echte Kundengespräche Schritt für Schritt — mit Sprachausgabe und Stimmtraining.',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
  },
]

export default function NavigationCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {sections.map(({ href, icon: Icon, title, description, color, bg }) => (
        <Link key={href} href={href} className="group">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-border group-hover:border-primary/40">
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 rounded-lg ${bg} flex items-center justify-center mb-2`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
