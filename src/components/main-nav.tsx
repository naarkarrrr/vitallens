'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Users,
  HeartPulse,
  Bed,
  TestTube,
  ClipboardPlus,
  Building,
  Siren,
  Stethoscope,
  FlaskConical,
  Pill,
  LayoutDashboard,
  CalendarDays,
  Wrench,
  Package,
  CircleDollarSign,
  Shield,
  BarChart,
  BrainCircuit,
  Bot,
  Plug,
  Truck,
  Wifi,
  Hospital,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const navSections = [
  {
    title: 'Patient & Clinical',
    icon: Stethoscope,
    links: [
      { href: '/admin_home', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/patients_list', label: 'Patients', icon: Users },
      { href: '/encounters_list', label: 'Encounters', icon: FileText },
    ],
    subSections: [
      {
        title: 'Clinical Records',
        defaultOpen: true,
        links: [
          { href: '/vitals_new', label: 'Record Vitals', icon: HeartPulse },
          { href: '/diagnosis_new', label: 'Add Diagnosis', icon: Stethoscope },
          { href: '/labs_new', label: 'New Lab Order', icon: TestTube },
          { href: '/prescriptions_new', label: 'New Prescription', icon: Pill },
        ],
      },
      {
        title: 'Views',
        links: [
            { href: '/patients_view', label: 'Patient Details', icon: Users },
            { href: '/encounters_view', label: 'Encounter Details', icon: FileText },
        ]
      }
    ],
  },
  {
    title: 'Operations',
    icon: Hospital,
    links: [
      { href: '/beds_dashboard', label: 'Bed Dashboard', icon: Bed },
      { href: '/wards_dashboard', label: 'Ward Overview', icon: Building },
      { href: '/icu_dashboard', label: 'ICU Overview', icon: Siren },
      { href: '/ot_schedule', label: 'OT Schedule', icon: CalendarDays },
      { href: '/staff_list', label: 'Staff', icon: Users },
      { href: '/staff_schedule', label: 'Staff Schedule', icon: CalendarDays },
      { href: '/equipment_list', label: 'Equipment', icon: Wrench },
      { href: '/inventory_list', label: 'Inventory', icon: Package },
      { href: '/inventory_edit', label: 'Edit Inventory', icon: Package },
    ],
  },
  {
    title: 'Finance',
    icon: CircleDollarSign,
    links: [
      { href: '/billing_dashboard', label: 'Billing', icon: CircleDollarSign },
      { href: '/insurance_dashboard', label: 'Insurance', icon: Shield },
    ],
  },
  {
    title: 'AI & Integrations',
    icon: BrainCircuit,
    subSections: [
      {
        title: 'AI Layer',
        links: [
          { href: '/ai_forecast', label: 'Forecasting', icon: BarChart },
          { href: '/ai_recommendations', label: 'Recommendations', icon: BrainCircuit },
          { href: '/ai_agent_panel', label: 'AI Agent', icon: Bot },
        ],
      },
      {
        title: 'Integrations',
        links: [
          { href: '/fhir_api_panel', label: 'FHIR API', icon: Plug },
          { href: '/supplier_integration', label: 'Supplier API', icon: Truck },
          { href: '/iot_integration', label: 'IoT Vitals', icon: Wifi },
        ],
      },
    ],
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-[calc(100vh-80px)] w-full">
      <div className="flex w-full flex-col gap-2 p-4 pt-0">
        {navSections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <section.icon className="h-4 w-4" />
              <span>{section.title}</span>
            </h3>
            {section.links?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === link.href && 'bg-accent text-accent-foreground font-medium'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            {section.subSections && (
              <Accordion type="multiple" defaultValue={section.subSections.filter(s => s.defaultOpen).map(s => s.title)} className="w-full">
                {section.subSections.map((subSection) => (
                  <AccordionItem value={subSection.title} key={subSection.title} className="border-b-0">
                    <AccordionTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]]:bg-accent [&[data-state=open]]:text-accent-foreground">
                      <span className='text-sm font-normal'>{subSection.title}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pb-0 pt-1">
                      {subSection.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            pathname === link.href && 'bg-accent text-accent-foreground font-medium'
                          )}
                        >
                          <link.icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
