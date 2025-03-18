"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { LucideIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  QrCode,
  Shield,
  Clock,
  Star,
  ArrowRight,
  MapPin,
  Phone,
  Navigation,
  Bell,
  Ticket,
  CheckCircle,
  AlertTriangle,
  School,
} from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
});

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`p-6 space-y-4 bg-card rounded-lg shadow-lg border ${className}`}
  >
    <div className="p-3 bg-primary/10 w-fit rounded-lg">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const QRCodeDemo = () => (
  <div className="relative p-4 bg-white rounded-lg shadow-lg">
    <QRCodeSVG
      value="https://schooltransit.ci/meal/123"
      size={120}
      level="H"
      includeMargin={true}
    />
    <div className="absolute -top-2 -right-2">
      <span className="px-2 py-1 text-xs font-semibold bg-primary text-white rounded-full">
        Demo
      </span>
    </div>
  </div>
);

const TicketCounter = ({ count }: { count: number }) => (
  <div className="flex items-center gap-2">
    <div className={`p-2 rounded-full ${
      count <= 1 ? "bg-red-100 text-red-600" :
      count <= 10 ? "bg-yellow-100 text-yellow-600" :
      "bg-green-100 text-green-600"
    }`}>
      <Ticket className="h-5 w-5" />
    </div>
    <span className="font-semibold">{count} tickets</span>
  </div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [demoTickets, setDemoTickets] = useState(5);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setDemoTickets(prev => (prev + 1) % 51);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  const features = [
    {
      icon: QrCode,
      title: "Suivi des Repas par QR Code",
      description: "Système innovant de gestion des tickets repas avec alertes intelligentes et suivi en temps réel.",
    },
    {
      icon: Navigation,
      title: "Géolocalisation en Direct",
      description: "Suivez les mouvements des élèves avec précision grâce à notre système de géolocalisation avancé.",
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Protection des données et sécurité des élèves garanties à chaque étape.",
    },
  ];

  const mealFeatures = [
    {
      icon: Utensils,
      title: "Repas Complet",
      items: ["Entrée", "Plat principal", "Dessert", "Boisson", "Goûter"],
    },
    {
      icon: Bell,
      title: "Système d'Alertes",
      description: "Notifications intelligentes à 1, 5 et 10 tickets restants",
    },
    {
      icon: QrCode,
      title: "Scan Simple",
      description: "Scannez et gérez vos tickets en un instant",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/5" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-primary/50 blur opacity-75" />
              <div className="relative bg-background rounded-full p-4">
                <School className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              School QRCode by
              <span className="text-primary"> T. Gogo</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Une solution moderne pour la gestion scolaire avec QR Code. 
              Sécurité, efficacité et tranquillité d'esprit pour les parents et les écoles.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="group">
                  Commencer
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Meal Tracking Section */}
      <div id="meal-tracking" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Suivi des Repas Intelligent</h2>
            <p className="text-lg text-muted-foreground">
              Un système innovant de gestion des tickets repas avec QR Code
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <QRCodeDemo />
                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={demoTickets}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-2"
                    >
                      <TicketCounter count={demoTickets} />
                      {demoTickets <= 1 && (
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm">Alerte : Tickets presque épuisés !</span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid gap-4">
                {mealFeatures.map((feature, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        {feature.items ? (
                          <ul className="mt-2 space-y-1">
                            {feature.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <MapWithNoSSR />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">Dernière activité</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Il y a 5 min</span>
                </div>
                <p className="text-sm mt-2">
                  Sophie est montée dans le bus à Riviera Palmeraie
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Fonctionnalités Principales</h2>
          <p className="text-lg text-muted-foreground">
            Des outils puissants pour une gestion efficace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Koné",
                role: "Parent d'élève",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80",
                content: "SchoolTransit a transformé notre routine quotidienne. Le suivi en temps réel et les notifications instantanées nous apportent une vraie tranquillité d'esprit.",
                rating: 5,
              },
              {
                name: "Dr. Ouattara",
                role: "Directeur d'école",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
                content: "Une solution innovante qui a considérablement amélioré notre gestion du transport scolaire. L'interface est intuitive et efficace.",
                rating: 5,
              },
              {
                name: "Ibrahim Touré",
                role: "Chauffeur de bus",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
                content: "L'application facilite grandement mon travail quotidien. La communication avec les parents est fluide et le suivi des trajets est précis.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "Comment fonctionne le système de tickets repas ?",
                answer: "Notre système utilise des QR codes uniques pour chaque élève. Un ticket donne droit à un repas complet comprenant une entrée, un plat principal, un dessert, une boisson et un goûter. Les parents reçoivent des alertes lorsque le solde atteint des seuils critiques (1, 5, 10 tickets).",
              },
              {
                question: "Comment suivre les déplacements de mon enfant ?",
                answer: "L'application permet de suivre en temps réel la position du bus scolaire. Vous recevez des notifications lors de la montée et de la descente de votre enfant, avec l'heure et la localisation précise.",
              },
              {
                question: "Le système est-il sécurisé ?",
                answer: "Absolument. Nous utilisons un cryptage de bout en bout pour toutes les données, et seuls les parents autorisés peuvent accéder aux informations de leurs enfants. Les QR codes sont également sécurisés et ne peuvent pas être dupliqués.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Contactez-nous</h2>
            <p className="text-muted-foreground">
              Notre équipe est là pour répondre à toutes vos questions
            </p>
            <div className="flex justify-center items-center gap-8">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>+225 0758966156</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
            <Link href="/contact">
              <Button size="lg">
                Nous contacter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <School className="h-6 w-6 text-primary" />
              <span className="font-semibold">SchoolSoft by Gogo</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <p className="text-sm text-muted-foreground">
                2024 SchoolSoft by Gogo. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}