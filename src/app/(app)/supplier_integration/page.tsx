import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Truck, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const suppliers = [
    { id: 'SUP01', name: 'Medline Industries', status: 'Active' },
    { id: 'SUP02', name: 'Cardinal Health', status: 'Active' },
    { id: 'SUP03', name: 'Global Pharma', status: 'Inactive' },
]

export default function SupplierIntegrationPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Supplier API Integration</CardTitle>
                <CardDescription>Manage and test integrations with inventory suppliers.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <Card>
                    <CardHeader><CardTitle>Connected Suppliers</CardTitle></CardHeader>
                    <CardContent>
                        {suppliers.map(s => (
                             <div key={s.id} className="flex items-center justify-between p-3 border-b">
                                <div className="flex items-center gap-3">
                                    <Truck className="h-6 w-6 text-muted-foreground" />
                                    <div>
                                        <h3 className="font-semibold">{s.name}</h3>
                                        <p className="text-sm text-muted-foreground">ID: {s.id}</p>
                                    </div>
                                </div>
                                <Badge className={s.status === 'Active' ? 'bg-green-500 text-white' : ''}>{s.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Send Supplier Order Request</CardTitle>
                        <CardDescription>Simulate sending an order request via API.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="item-id">Item ID</Label>
                                <Input id="item-id" defaultValue="INV001" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input id="quantity" type="number" defaultValue="500" />
                            </div>
                        </div>
                        <Button>
                            <Send className="h-4 w-4 mr-2" />
                            Send Order Request
                        </Button>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}
