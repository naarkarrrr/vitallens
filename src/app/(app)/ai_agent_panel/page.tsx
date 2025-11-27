import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Bot, AlertTriangle } from "lucide-react"

export default function AiAgentPanelPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>AI Agent Control Panel</CardTitle>
                    <CardDescription>Configure and monitor the hospital's operational AI agent.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 p-4 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800">
                        <AlertTriangle className="h-5 w-5"/>
                        <p className="text-sm">Changes here directly impact automated hospital operations. Proceed with caution.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Agent Status & Mode</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="agent-master-switch">AI Agent Master Switch</Label>
                            <Switch id="agent-master-switch" checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="autonomous-mode">Enable Autonomous Mode</Label>
                            <Switch id="autonomous-mode" />
                        </div>
                        <div className="flex items-center p-3 rounded-lg bg-green-50 border border-green-200 text-green-800">
                            <Bot className="h-5 w-5 mr-3"/>
                            <p className="text-sm font-medium">Status: Active & Monitoring</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Operational Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="confidence-threshold">Action Confidence Threshold</Label>
                            <div className="flex items-center gap-4">
                                <Slider id="confidence-threshold" defaultValue={[85]} max={100} step={1} />
                                <span className="font-bold w-12 text-right">85%</span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="intervention-level">Human Intervention Level</Label>
                            <div className="flex items-center gap-4">
                                <Slider id="intervention-level" defaultValue={[30]} max={100} step={1} />
                                <span className="font-bold w-12 text-right">30%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
