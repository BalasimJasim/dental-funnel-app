export const services = {
  consultations: [
    {
      id: 'cons-1',
      name: 'General Consultation',
      duration: 30,
      price: 50,
      description: 'Initial dental check-up and treatment planning'
    },
    {
      id: 'cons-2',
      name: 'Orthodontic Consultation',
      duration: 45,
      price: 75,
      description: 'Specialized consultation for orthodontic treatment'
    },
    {
      id: 'cons-3',
      name: 'Implant Consultation',
      duration: 45,
      price: 100,
      description: 'Detailed assessment for dental implants'
    }
  ],
  operativeDentistry: [
    {
      id: 'op-1',
      name: 'Dental Filling',
      duration: 60,
      priceRange: '100-300',
      description: 'Tooth restoration with composite materials'
    },
    {
      id: 'op-2',
      name: 'Professional Cleaning',
      duration: 45,
      price: 80,
      description: 'Deep cleaning and plaque removal'
    },
    {
      id: 'op-3',
      name: 'Root Canal Treatment',
      duration: 90,
      priceRange: '500-800',
      description: 'Complete root canal procedure with filling'
    },
    {
      id: 'op-4',
      name: 'Teeth Whitening',
      duration: 60,
      price: 300,
      description: 'Professional teeth whitening treatment'
    },
    {
      id: 'op-5',
      name: 'Night Guard',
      duration: 30,
      price: 200,
      description: 'Custom-made night guard for teeth grinding'
    }
  ],
  orthodontics: [
    {
      id: 'ortho-1',
      name: 'Traditional Braces',
      duration: 45,
      priceRange: '3000-5000',
      description: 'Complete orthodontic treatment with traditional braces'
    },
    {
      id: 'ortho-2',
      name: 'Clear Aligners',
      duration: 30,
      priceRange: '4000-6000',
      description: 'Invisible aligners for teeth straightening'
    },
    {
      id: 'ortho-3',
      name: 'Pediatric Orthodontics',
      duration: 45,
      priceRange: '2500-4500',
      description: 'Early orthodontic treatment for children'
    },
    {
      id: 'ortho-4',
      name: 'Retainers',
      duration: 30,
      price: 300,
      description: 'Custom-made retainers for post-treatment'
    }
  ],
  prostheticDentistry: [
    {
      id: 'pros-1',
      name: 'Crown',
      duration: 90,
      priceRange: '800-1200',
      description: 'Custom-made dental crown'
    },
    {
      id: 'pros-2',
      name: 'Bridge',
      duration: 120,
      priceRange: '2000-3000',
      description: 'Fixed bridge for multiple teeth replacement'
    },
    {
      id: 'pros-3',
      name: 'Complete Denture',
      duration: 120,
      priceRange: '1500-2500',
      description: 'Full denture for complete tooth replacement'
    },
    {
      id: 'pros-4',
      name: 'Partial Denture',
      duration: 90,
      priceRange: '1000-2000',
      description: 'Removable partial denture'
    }
  ],
  dentalSurgery: [
    {
      id: 'surg-1',
      name: 'Single Implant',
      duration: 120,
      priceRange: '2000-3000',
      description: 'Complete dental implant procedure'
    },
    {
      id: 'surg-2',
      name: 'All-on-4 Implants',
      duration: 180,
      priceRange: '15000-25000',
      description: 'Full arch replacement with 4 implants'
    },
    {
      id: 'surg-3',
      name: 'Bone Grafting',
      duration: 90,
      priceRange: '500-1500',
      description: 'Bone augmentation for implant preparation'
    },
    {
      id: 'surg-4',
      name: 'Sinus Lift',
      duration: 120,
      priceRange: '1500-3000',
      description: 'Sinus augmentation for upper jaw implants'
    }
  ]
};

export default services; 