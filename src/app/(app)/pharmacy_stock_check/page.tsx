
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search, AlertCircle, CheckCircle, PackageOpen } from "lucide-react";
import { useState } from "react";
import { checkMedicineStock, CheckMedicineStockOutput } from "@/ai/flows/check-medicine-stock";
import { inventory } from "@/lib/placeholder-data";

export default function PharmacyStockCheckPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [result, setResult] = useState<CheckMedicineStockOutput | null>(null);

    const handleSearch = async () => {
        if (!searchTerm) return;
        setIsLoading(true);
        setResult(null);
        try {
            // In a real app, this would be a fuzzy search on the backend.
            // Here we simulate it by finding the first match.
            const matchedItem = inventory.find(item => item.item_name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (matchedItem) {
                const response = await checkMedicineStock({ medicineName: matchedItem.item_name });
                setResult(response);
            } else {
                 setResult({
                    itemName: searchTerm,
                    quantity: 0,
                    status: "Not Found",
                    reorderLevel: 0,
                    supplierId: "N/A"
                });
            }
        } catch (error) {
            console.error("Error checking stock:", error);
        }
        setIsLoading(false);
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'In Stock':
                return { icon: <CheckCircle className="h-5 w-5 text-green-600" />, color: "text-green-600" };
            case 'Low Stock':
                return { icon: <AlertCircle className="h-5 w-5 text-yellow-600" />, color: "text-yellow-600" };
            case 'Out of Stock':
                return { icon: <AlertCircle className="h-5 w-5 text-red-600" />, color: "text-red-600" };
            default:
                return { icon: <PackageOpen className="h-5 w-5 text-muted-foreground" />, color: "text-muted-foreground" };
        }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Pharmacy Stock Check</CardTitle>
          <CardDescription>
            Search for medicines to view real-time stock levels, and reorder information.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            <div className="flex gap-2">
                <Input 
                    placeholder="Enter medicine name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={isLoading || !searchTerm}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
            </div>
            
            {result && (
                <Card>
                    <CardHeader>
                        <CardTitle>Stock Details for: {result.itemName}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                            {getStatusInfo(result.status).icon}
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <p className={`font-bold ${getStatusInfo(result.status).color}`}>{result.status}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Quantity Available</p>
                            <p className="font-bold text-2xl">{result.quantity.toLocaleString()}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Reorder Level</p>
                            <p className="font-bold text-2xl">{result.reorderLevel.toLocaleString()}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Supplier ID</p>
                            <p className="font-bold text-lg">{result.supplierId}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </CardContent>
      </Card>
    )
  }
