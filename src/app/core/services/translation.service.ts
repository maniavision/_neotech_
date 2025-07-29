import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    private translate = inject(TranslateService);
    private currentLanguageSubject = new BehaviorSubject<string>('en');
    public currentLanguage$ = this.currentLanguageSubject.asObservable();
  
    public availableLanguages: Language[] = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' }
    ];
  
    // Define translations directly in the service
    private translations = {
      en: {
        header: {
          brand: "IT Consulting",
          subtitle: "Professional Solutions",
          nav: {
            home: "Home",
            submitRequest: "Submit Request",
            login: "Login",
            dashboard: "Dashboard",
            logout: "Logout"
          }
        },
        home: {
          hero: {
            badge: "Welcome to the Future of IT Solutions",
            title: {
              line1: "Transform Your Business",
              line2: "with Expert IT Solutions"
            },
            subtitle: "Unlock your potential with cutting-edge web development, data management, ETL processes, and cloud hosting solutions designed for modern enterprises.",
            cta: {
              primary: "Start Your Journey",
              secondary: "Explore Services"
            },
            stats: {
              projects: "Projects Completed",
              satisfaction: "Client Satisfaction",
              support: "Support Available"
            }
          },
          services: {
            badge: "Our Expertise",
            title: "Comprehensive IT Solutions",
            subtitle: "We deliver end-to-end technology solutions that drive innovation and accelerate your business growth",
            items: {
              webDevelopment: {
                title: "Web Development",
                category: "Frontend & Backend",
                description: "Custom web applications built with modern frameworks and best practices for optimal performance and user experience.",
                features: [
                  "Responsive Design",
                  "Progressive Web Apps",
                  "API Integration",
                  "Performance Optimization"
                ]
              },
              dataManagement: {
                title: "Data Management",
                category: "Analytics & Storage",
                description: "Comprehensive data solutions including storage, processing, analytics, and visualization for data-driven decisions.",
                features: [
                  "Data Warehousing",
                  "Real-time Analytics",
                  "Data Visualization",
                  "Business Intelligence"
                ]
              },
              etlProcess: {
                title: "ETL Process",
                category: "Data Integration",
                description: "Seamless Extract, Transform, Load processes for efficient data integration across multiple systems and platforms.",
                features: [
                  "Data Pipeline Design",
                  "Automated Processing",
                  "Data Quality Assurance",
                  "Monitoring & Alerts"
                ]
              },
              cloudHosting: {
                title: "Cloud Hosting",
                category: "Infrastructure",
                description: "Scalable and secure cloud infrastructure solutions on AWS and GCP with 99.9% uptime guarantee.",
                features: [
                  "Auto-scaling",
                  "Load Balancing",
                  "Security Compliance",
                  "24/7 Monitoring"
                ]
              },
              customSolutions: {
                title: "Custom Solutions",
                category: "Tailored Development",
                description: "Bespoke software solutions designed specifically for your unique business requirements and workflows.",
                features: [
                  "Requirements Analysis",
                  "Custom Architecture",
                  "Integration Support",
                  "Ongoing Maintenance"
                ]
              },
              devops: {
                title: "DevOps & CI/CD",
                category: "Automation",
                description: "Streamlined development workflows with automated testing, deployment, and infrastructure management.",
                features: [
                  "Pipeline Automation",
                  "Container Orchestration",
                  "Infrastructure as Code",
                  "Monitoring & Logging"
                ]
              }
            }
          },
          technologies: {
            badge: "Our Stack",
            title: "Cutting-Edge Technologies",
            subtitle: "We leverage the latest tools and frameworks to build scalable, robust solutions",
            categories: {
              backend: {
                title: "Backend Development",
                description: "Robust server-side solutions",
                technologies: {
                  springBoot: { name: "Spring Boot", level: "Expert" },
                  nodejs: { name: "Node.js", level: "Expert" },
                  python: { name: "Python", level: "Advanced" },
                  java: { name: "Java", level: "Expert" }
                }
              },
              frontend: {
                title: "Frontend Development",
                description: "Modern user interfaces",
                technologies: {
                  angular: { name: "Angular", level: "Expert" },
                  react: { name: "React", level: "Expert" },
                  vue: { name: "Vue.js", level: "Advanced" },
                  typescript: { name: "TypeScript", level: "Expert" }
                }
              },
              data: {
                title: "Data & Analytics",
                description: "Data-driven insights",
                technologies: {
                  postgresql: { name: "PostgreSQL", level: "Expert" },
                  mongodb: { name: "MongoDB", level: "Advanced" },
                  kafka: { name: "Apache Kafka", level: "Expert" },
                  redis: { name: "Redis", level: "Advanced" }
                }
              },
              cloud: {
                title: "Cloud & DevOps",
                description: "Scalable infrastructure",
                technologies: {
                  aws: { name: "AWS", level: "Expert" },
                  gcp: { name: "Google Cloud", level: "Expert" },
                  docker: { name: "Docker", level: "Expert" },
                  kubernetes: { name: "Kubernetes", level: "Advanced" }
                }
              }
            }
          },
          cta: {
            badge: "Ready to Get Started?",
            title: "Transform Your Vision into Reality",
            subtitle: "Join hundreds of satisfied clients who have accelerated their digital transformation journey with our expert solutions.",
            buttons: {
              primary: "Start Your Project",
              secondary: "Schedule Consultation"
            },
            testimonial: {
              quote: "The IT consulting team delivered exceptional results that exceeded our expectations.",
              author: "Sarah Johnson",
              title: "CTO, TechCorp"
            }
          }
        },
        common: {
          loading: "Loading...",
          error: "An error occurred",
          success: "Success",
          cancel: "Cancel",
          save: "Save",
          submit: "Submit",
          close: "Close"
        }
      },
      fr: {
        header: {
          brand: "Conseil IT",
          subtitle: "Solutions Professionnelles",
          nav: {
            home: "Accueil",
            submitRequest: "Soumettre une Demande",
            login: "Connexion",
            dashboard: "Tableau de Bord",
            logout: "Déconnexion"
          }
        },
        home: {
          hero: {
            badge: "Bienvenue dans l'Avenir des Solutions IT",
            title: {
              line1: "Transformez Votre Entreprise",
              line2: "avec des Solutions IT Expertes"
            },
            subtitle: "Libérez votre potentiel avec des solutions de pointe en développement web, gestion de données, processus ETL et hébergement cloud conçues pour les entreprises modernes.",
            cta: {
              primary: "Commencez Votre Voyage",
              secondary: "Explorer les Services"
            },
            stats: {
              projects: "Projets Terminés",
              satisfaction: "Satisfaction Client",
              support: "Support Disponible"
            }
          },
          services: {
            badge: "Notre Expertise",
            title: "Solutions IT Complètes",
            subtitle: "Nous livrons des solutions technologiques de bout en bout qui stimulent l'innovation et accélèrent la croissance de votre entreprise",
            items: {
              webDevelopment: {
                title: "Développement Web",
                category: "Frontend & Backend",
                description: "Applications web personnalisées construites avec des frameworks modernes et les meilleures pratiques pour des performances optimales et une expérience utilisateur.",
                features: [
                  "Design Responsive",
                  "Applications Web Progressives",
                  "Intégration API",
                  "Optimisation des Performances"
                ]
              },
              dataManagement: {
                title: "Gestion des Données",
                category: "Analytique & Stockage",
                description: "Solutions de données complètes incluant le stockage, le traitement, l'analytique et la visualisation pour des décisions basées sur les données.",
                features: [
                  "Entrepôt de Données",
                  "Analytique en Temps Réel",
                  "Visualisation de Données",
                  "Intelligence d'Affaires"
                ]
              },
              etlProcess: {
                title: "Processus ETL",
                category: "Intégration de Données",
                description: "Processus d'Extraction, Transformation, Chargement transparents pour une intégration efficace des données entre plusieurs systèmes et plateformes.",
                features: [
                  "Conception de Pipeline de Données",
                  "Traitement Automatisé",
                  "Assurance Qualité des Données",
                  "Surveillance & Alertes"
                ]
              },
              cloudHosting: {
                title: "Hébergement Cloud",
                category: "Infrastructure",
                description: "Solutions d'infrastructure cloud évolutives et sécurisées sur AWS et GCP avec garantie de disponibilité de 99,9%.",
                features: [
                  "Auto-scaling",
                  "Équilibrage de Charge",
                  "Conformité Sécuritaire",
                  "Surveillance 24/7"
                ]
              },
              customSolutions: {
                title: "Solutions Personnalisées",
                category: "Développement Sur Mesure",
                description: "Solutions logicielles sur mesure conçues spécifiquement pour vos exigences et flux de travail d'entreprise uniques.",
                features: [
                  "Analyse des Exigences",
                  "Architecture Personnalisée",
                  "Support d'Intégration",
                  "Maintenance Continue"
                ]
              },
              devops: {
                title: "DevOps & CI/CD",
                category: "Automatisation",
                description: "Flux de travail de développement rationalisés avec tests automatisés, déploiement et gestion d'infrastructure.",
                features: [
                  "Automatisation de Pipeline",
                  "Orchestration de Conteneurs",
                  "Infrastructure as Code",
                  "Surveillance & Journalisation"
                ]
              }
            }
          },
          technologies: {
            badge: "Notre Stack",
            title: "Technologies de Pointe",
            subtitle: "Nous exploitons les outils et frameworks les plus récents pour construire des solutions évolutives et robustes",
            categories: {
              backend: {
                title: "Développement Backend",
                description: "Solutions côté serveur robustes",
                technologies: {
                  springBoot: { name: "Spring Boot", level: "Expert" },
                  nodejs: { name: "Node.js", level: "Expert" },
                  python: { name: "Python", level: "Avancé" },
                  java: { name: "Java", level: "Expert" }
                }
              },
              frontend: {
                title: "Développement Frontend",
                description: "Interfaces utilisateur modernes",
                technologies: {
                  angular: { name: "Angular", level: "Expert" },
                  react: { name: "React", level: "Expert" },
                  vue: { name: "Vue.js", level: "Avancé" },
                  typescript: { name: "TypeScript", level: "Expert" }
                }
              },
              data: {
                title: "Données & Analytique",
                description: "Insights basés sur les données",
                technologies: {
                  postgresql: { name: "PostgreSQL", level: "Expert" },
                  mongodb: { name: "MongoDB", level: "Avancé" },
                  kafka: { name: "Apache Kafka", level: "Expert" },
                  redis: { name: "Redis", level: "Avancé" }
                }
              },
              cloud: {
                title: "Cloud & DevOps",
                description: "Infrastructure évolutive",
                technologies: {
                  aws: { name: "AWS", level: "Expert" },
                  gcp: { name: "Google Cloud", level: "Expert" },
                  docker: { name: "Docker", level: "Expert" },
                  kubernetes: { name: "Kubernetes", level: "Avancé" }
                }
              }
            }
          },
          cta: {
            badge: "Prêt à Commencer?",
            title: "Transformez Votre Vision en Réalité",
            subtitle: "Rejoignez des centaines de clients satisfaits qui ont accéléré leur parcours de transformation numérique avec nos solutions expertes.",
            buttons: {
              primary: "Commencer Votre Projet",
              secondary: "Planifier une Consultation"
            },
            testimonial: {
              quote: "L'équipe de conseil IT a livré des résultats exceptionnels qui ont dépassé nos attentes.",
              author: "Sarah Johnson",
              title: "CTO, TechCorp"
            }
          }
        },
        common: {
          loading: "Chargement...",
          error: "Une erreur s'est produite",
          success: "Succès",
          cancel: "Annuler",
          save: "Sauvegarder",
          submit: "Soumettre",
          close: "Fermer"
        }
      }
    };
  
    constructor() {
      this.initializeLanguage();
    }
  
    private initializeLanguage(): void {
      // Set default language
      this.translate.setDefaultLang('en');
      
      // Load translations
      this.translate.setTranslation('en', this.translations.en);
      this.translate.setTranslation('fr', this.translations.fr);
      
      // Get saved language or use browser language
      const savedLanguage = localStorage.getItem('selectedLanguage');
      const browserLanguage = this.translate.getBrowserLang();
      
      let languageToUse = 'en'; // Default fallback
      
      if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
        languageToUse = savedLanguage;
      } else if (browserLanguage && this.isLanguageSupported(browserLanguage)) {
        languageToUse = browserLanguage;
      }
      
      this.setLanguage(languageToUse);
    }
  
    public setLanguage(language: string): void {
      if (this.isLanguageSupported(language)) {
        this.translate.use(language);
        this.currentLanguageSubject.next(language);
        localStorage.setItem('selectedLanguage', language);
        
        // Update HTML lang attribute
        document.documentElement.lang = language;
      }
    }
  
    public getCurrentLanguage(): string {
      return this.currentLanguageSubject.value;
    }
  
    public getTranslation(key: string, params?: any): string {
      return this.translate.instant(key, params);
    }
  
    private isLanguageSupported(language: string): boolean {
      return this.availableLanguages.some(lang => lang.code === language);
    }
}
