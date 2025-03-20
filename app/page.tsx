"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { DivideIcon as LucideIcon } from "lucide-react";

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
  Plus,
  Mail,
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

  const faqItems = [
    {
      question: "Comment fonctionne le système de QR Code ?",
      answer: "Chaque élève reçoit un QR Code unique qui est scanné à l'entrée de l'école et à la cantine. Ce système permet un suivi en temps réel et une gestion efficace des présences et des repas."
    },
    {
      question: "Les données sont-elles sécurisées ?",
      answer: "Oui, toutes les données sont cryptées et stockées de manière sécurisée. Seuls les utilisateurs autorisés peuvent accéder aux informations, conformément au RGPD."
    },
    {
      question: "Comment les parents sont-ils notifiés ?",
      answer: "Les parents reçoivent des notifications en temps réel via l'application mobile pour l'arrivée et le départ de leur enfant, ainsi que pour les repas pris à la cantine."
    },
    {
      question: "Que faire en cas de perte du QR Code ?",
      answer: "En cas de perte, contactez immédiatement l'administration. Un nouveau QR Code sera généré et l'ancien sera désactivé pour des raisons de sécurité."
    }
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
                <img 
                  src="https://img.freepik.com/photos-gratuite/eleve-montrant-son-badge-identite_23-2148236822.jpg" 
                  alt="Student scanning badge" 
                  className="h-24 w-24 object-cover rounded-full"
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              QR-Safe for School
              <span className="text-primary"> Fred et Poppée</span>
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

      {/* Features Section */}
      <div id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fonctionnalités Principales</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment notre système innovant améliore la sécurité et l'efficacité de votre établissement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Ce que disent nos utilisateurs</h2>
            <Link href="/testimonials">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un avis
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Koné",
                role: "Parent d'élève",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80",
                content: "QR-Safe a transformé notre routine quotidienne. Le suivi en temps réel et les notifications instantanées nous apportent une vraie tranquillité d'esprit.",
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
      <div id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Questions Fréquentes</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Contactez-nous</h2>
            <p className="text-muted-foreground mt-2">Nous sommes là pour répondre à vos questions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-muted-foreground">Cocody Riviera, Abidjan, Côte d'Ivoire</p>
              </div>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Téléphone</h3>
                <p className="text-muted-foreground">+225 0758966156</p>
              </div>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">contact@schooltransit.ci</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">QR-Safe</span>
              </div>
              <p className="text-muted-foreground">
                Solution innovante pour la sécurité et la gestion scolaire.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-muted-foreground hover:text-primary">Fonctionnalités</Link></li>
                <li><Link href="#testimonials" className="text-muted-foreground hover:text-primary">Témoignages</Link></li>
                <li><Link href="#faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                <li><Link href="#contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Politique de confidentialité</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Conditions d'utilisation</Link></li>
                <li><Link href="/mentions" className="text-muted-foreground hover:text-primary">Mentions légales</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Nous Suivre</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 QR-Safe. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}