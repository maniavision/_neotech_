import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

interface Technology {
  name: string;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(60px)' }),
          stagger(150, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  services = [
    {
      title: 'Web Development',
      category: 'Frontend & Backend',
      description: 'Custom web applications built with modern frameworks and best practices for optimal performance and user experience.',
      icon: '🌐',
      features: [
        'Responsive Design',
        'Progressive Web Apps',
        'API Integration',
        'Performance Optimization'
      ],
      priceRange: 'From $5,000'
    },
    {
      title: 'Data Management',
      category: 'Analytics & Storage',
      description: 'Comprehensive data solutions including storage, processing, analytics, and visualization for data-driven decisions.',
      icon: '📊',
      features: [
        'Data Warehousing',
        'Real-time Analytics',
        'Data Visualization',
        'Business Intelligence'
      ],
      priceRange: 'From $8,000'
    },
    {
      title: 'ETL Process',
      category: 'Data Integration',
      description: 'Seamless Extract, Transform, Load processes for efficient data integration across multiple systems and platforms.',
      icon: '🔄',
      features: [
        'Data Pipeline Design',
        'Automated Processing',
        'Data Quality Assurance',
        'Monitoring & Alerts'
      ],
      priceRange: 'From $6,000'
    },
    {
      title: 'Cloud Hosting',
      category: 'Infrastructure',
      description: 'Scalable and secure cloud infrastructure solutions on AWS and GCP with 99.9% uptime guarantee.',
      icon: '☁️',
      features: [
        'Auto-scaling',
        'Load Balancing',
        'Security Compliance',
        '24/7 Monitoring'
      ],
      priceRange: 'From $500/month'
    },
    {
      title: 'Custom Solutions',
      category: 'Tailored Development',
      description: 'Bespoke software solutions designed specifically for your unique business requirements and workflows.',
      icon: '🎯',
      features: [
        'Requirements Analysis',
        'Custom Architecture',
        'Integration Support',
        'Ongoing Maintenance'
      ],
      priceRange: 'Custom Quote'
    },
    {
      title: 'DevOps & CI/CD',
      category: 'Automation',
      description: 'Streamlined development workflows with automated testing, deployment, and infrastructure management.',
      icon: '⚙️',
      features: [
        'Pipeline Automation',
        'Container Orchestration',
        'Infrastructure as Code',
        'Monitoring & Logging'
      ],
      priceRange: 'From $4,000'
    }
  ];

  techCategories = [
    {
      name: 'Backend Development',
      icon: '🏗️',
      description: 'Robust server-side solutions',
      technologies: [
        { name: 'Spring Boot', icon: '🍃', level: 'Expert', rating: 5 },
        { name: 'Node.js', icon: '🟢', level: 'Expert', rating: 5 },
        { name: 'Python', icon: '🐍', level: 'Advanced', rating: 4 },
        { name: 'Java', icon: '☕', level: 'Expert', rating: 5 }
      ]
    },
    {
      name: 'Frontend Development',
      icon: '🎨',
      description: 'Modern user interfaces',
      technologies: [
        { name: 'Angular', icon: '🅰️', level: 'Expert', rating: 5 },
        { name: 'React', icon: '⚛️', level: 'Expert', rating: 5 },
        { name: 'Vue.js', icon: '💚', level: 'Advanced', rating: 4 },
        { name: 'TypeScript', icon: '📘', level: 'Expert', rating: 5 }
      ]
    },
    {
      name: 'Data & Analytics',
      icon: '📈',
      description: 'Data-driven insights',
      technologies: [
        { name: 'PostgreSQL', icon: '🐘', level: 'Expert', rating: 5 },
        { name: 'MongoDB', icon: '🍃', level: 'Advanced', rating: 4 },
        { name: 'Apache Kafka', icon: '📨', level: 'Expert', rating: 5 },
        { name: 'Redis', icon: '🔴', level: 'Advanced', rating: 4 }
      ]
    },
    {
      name: 'Cloud & DevOps',
      icon: '🚀',
      description: 'Scalable infrastructure',
      technologies: [
        { name: 'AWS', icon: '☁️', level: 'Expert', rating: 5 },
        { name: 'Google Cloud', icon: '🌤️', level: 'Expert', rating: 5 },
        { name: 'Docker', icon: '🐳', level: 'Expert', rating: 5 },
        { name: 'Kubernetes', icon: '⚓', level: 'Advanced', rating: 4 }
      ]
    }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  trackByService(index: number, service: any): any {
    return service.title;
  }

  trackByCategory(index: number, category: any): any {
    return category.name;
  }

  trackByTech(index: number, tech: any): any {
    return tech.name;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
