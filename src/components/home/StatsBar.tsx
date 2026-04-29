import { BookOpen, MessageSquare, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsBarProps {
  vokabelnCount: number
  redewendungenCount: number
  konversationenCount: number
}

export default function StatsBar({
  vokabelnCount,
  redewendungenCount,
  konversationenCount,
}: StatsBarProps) {
  const stats = [
    { icon: BookOpen, label: 'Vokabeln', value: vokabelnCount, color: 'text-primary' },
    { icon: MessageSquare, label: 'Redewendungen', value: redewendungenCount, color: 'text-amber-600' },
    { icon: Play, label: 'Simulationen', value: konversationenCount, color: 'text-teal-600' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <Card key={label} className="text-center">
          <CardContent className="pt-6 pb-4">
            <Icon className={`h-7 w-7 mx-auto mb-2 ${color}`} />
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
