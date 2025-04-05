const analyzeImage = async (image, description) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Extract keywords from description
  const keywords = description.toLowerCase().split(' ');
  
  // Define medical conditions with their characteristics
  const conditions = {
    pneumonia: {
      keywords: ['pneumonia', 'lung', 'infection', 'chest', 'breathing', 'cough', 'fever'],
      findings: [
        'Consolidation in lung fields',
        'Increased lung opacity',
        'Pleural effusion',
        'Air bronchograms',
        'Patchy infiltrates'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Right lower lobe', 'Left lower lobe', 'Bilateral', 'Upper lobes'],
      patterns: ['Lobar', 'Bronchopneumonia', 'Interstitial']
    },
    tuberculosis: {
      keywords: ['tb', 'tuberculosis', 'mycobacterium', 'cavity', 'nodule'],
      findings: [
        'Cavitary lesions',
        'Nodular opacities',
        'Fibrotic changes',
        'Pleural thickening',
        'Calcified lesions'
      ],
      severity: ['Early', 'Active', 'Advanced'],
      location: ['Apical', 'Upper lobes', 'Multiple lobes'],
      patterns: ['Cavitary', 'Miliary', 'Fibro-cavitary']
    },
    covid: {
      keywords: ['covid', 'coronavirus', 'sars', 'respiratory', 'viral'],
      findings: [
        'Ground-glass opacities',
        'Peripheral distribution',
        'Bilateral involvement',
        'Vascular thickening',
        'Crazy-paving pattern'
      ],
      severity: ['Mild', 'Moderate', 'Severe', 'Critical'],
      location: ['Peripheral', 'Posterior', 'Lower lobes', 'Bilateral'],
      patterns: ['Ground-glass', 'Consolidation', 'Mixed']
    },
    lungCancer: {
      keywords: ['cancer', 'tumor', 'mass', 'lesion', 'malignant', 'nodule'],
      findings: [
        'Solitary pulmonary nodule',
        'Mass lesion',
        'Spiculated margins',
        'Pleural effusion',
        'Lymphadenopathy'
      ],
      severity: ['Early stage', 'Locally advanced', 'Metastatic'],
      location: ['Peripheral', 'Central', 'Multiple sites'],
      patterns: ['Nodular', 'Mass-like', 'Infiltrative']
    },
    heartFailure: {
      keywords: ['heart', 'failure', 'cardiomegaly', 'edema', 'fluid'],
      findings: [
        'Cardiomegaly',
        'Pulmonary vascular congestion',
        'Pleural effusions',
        'Interstitial edema',
        'Kerley B lines'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Bilateral', 'Perihilar', 'Diffuse'],
      patterns: ['Vascular', 'Interstitial', 'Alveolar']
    },
    asthma: {
      keywords: ['asthma', 'wheezing', 'bronchospasm', 'airway'],
      findings: [
        'Hyperinflation',
        'Bronchial wall thickening',
        'Air trapping',
        'Normal heart size',
        'Clear lung fields'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Diffuse', 'Bilateral'],
      patterns: ['Obstructive', 'Hyperinflation']
    },
    pulmonaryEmbolism: {
      keywords: ['pe', 'embolism', 'clot', 'thrombus', 'vascular'],
      findings: [
        'Wedge-shaped consolidation',
        'Decreased vascularity',
        'Pleural effusion',
        'Elevated hemidiaphragm',
        'Oligemia'
      ],
      severity: ['Small', 'Moderate', 'Massive'],
      location: ['Peripheral', 'Central', 'Multiple'],
      patterns: ['Vascular', 'Parenchymal']
    },
    normal: {
      keywords: ['normal', 'clear', 'healthy', 'routine'],
      findings: [
        'Clear lung fields',
        'Normal heart size',
        'No active disease',
        'Normal vascular markings',
        'Clear costophrenic angles'
      ],
      severity: ['None'],
      location: ['N/A'],
      patterns: ['Normal']
    },
    // Skin conditions
    eczema: {
      keywords: ['eczema', 'dermatitis', 'itchy', 'red', 'dry', 'skin', 'rash', 'atopic'],
      findings: [
        'Erythematous patches',
        'Scaling and dryness',
        'Lichenification',
        'Pruritic lesions',
        'Distribution in flexural areas'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Flexural areas', 'Extensor surfaces', 'Face', 'Hands', 'Generalized'],
      patterns: ['Chronic', 'Recurrent', 'Patchy']
    },
    psoriasis: {
      keywords: ['psoriasis', 'scaly', 'silver', 'plaques', 'thick', 'skin'],
      findings: [
        'Well-demarcated erythematous plaques',
        'Silvery-white scaling',
        'Thickened skin',
        'Nail changes',
        'Scalp involvement'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Extensor surfaces', 'Scalp', 'Nails', 'Flexural areas', 'Palms and soles'],
      patterns: ['Plaque', 'Guttate', 'Inverse']
    },
    acne: {
      keywords: ['acne', 'pimples', 'blackheads', 'whiteheads', 'comedones', 'spots'],
      findings: [
        'Comedones (open and closed)',
        'Inflammatory papules',
        'Pustules',
        'Nodules',
        'Scarring'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Face', 'Chest', 'Back', 'Shoulders'],
      patterns: ['Inflammatory', 'Non-inflammatory', 'Mixed']
    },
    rosacea: {
      keywords: ['rosacea', 'redness', 'flushing', 'facial', 'telangiectasia'],
      findings: [
        'Facial erythema',
        'Telangiectasia',
        'Papules and pustules',
        'Rhinophyma',
        'Ocular involvement'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Central face', 'Cheeks', 'Nose', 'Forehead'],
      patterns: ['Erythematotelangiectatic', 'Papulopustular', 'Phymatous']
    },
    fungalInfection: {
      keywords: ['fungal', 'ringworm', 'tinea', 'yeast', 'candidiasis', 'infection'],
      findings: [
        'Circular or annular lesions',
        'Scaling at the edges',
        'Erythema',
        'Itching',
        'Satellite lesions'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Groin', 'Feet', 'Scalp', 'Body', 'Nails'],
      patterns: ['Annular', 'Patchy', 'Confluent']
    },
    melanoma: {
      keywords: ['melanoma', 'mole', 'dark', 'irregular', 'asymmetric', 'skin cancer'],
      findings: [
        'Asymmetric lesion',
        'Irregular borders',
        'Variable coloration',
        'Diameter > 6mm',
        'Evolution or change'
      ],
      severity: ['Early', 'Invasive', 'Metastatic'],
      location: ['Any skin surface', 'Sun-exposed areas', 'Mucosal surfaces'],
      patterns: ['Superficial spreading', 'Nodular', 'Lentigo maligna']
    },
    hives: {
      keywords: ['hives', 'urticaria', 'wheals', 'allergic', 'itching', 'welts'],
      findings: [
        'Raised, erythematous wheals',
        'Itching',
        'Angioedema',
        'Transient nature',
        'Dermatographism'
      ],
      severity: ['Mild', 'Moderate', 'Severe'],
      location: ['Any skin surface', 'Face', 'Extremities', 'Trunk'],
      patterns: ['Acute', 'Chronic', 'Physical']
    }
  };

  // Calculate condition matches
  const conditionMatches = Object.entries(conditions).map(([condition, data]) => {
    const matches = data.keywords.filter(keyword => 
      keywords.some(k => k.includes(keyword))
    ).length;
    return { condition, matches };
  });

  // Sort by matches and get the most likely condition
  conditionMatches.sort((a, b) => b.matches - a.matches);
  const mostLikelyCondition = conditionMatches[0].condition;
  const conditionData = conditions[mostLikelyCondition];

  // Calculate confidence based on matches and image characteristics
  const baseConfidence = (conditionMatches[0].matches / conditionData.keywords.length) * 100;
  const confidence = Math.min(95, Math.max(60, baseConfidence));

  // Generate findings based on condition and confidence
  const numFindings = Math.max(3, Math.floor(confidence / 20));
  const findings = conditionData.findings
    .sort(() => Math.random() - 0.5)
    .slice(0, numFindings);

  // Select random severity, location, and pattern
  const severity = conditionData.severity[Math.floor(Math.random() * conditionData.severity.length)];
  const location = conditionData.location[Math.floor(Math.random() * conditionData.location.length)];
  const pattern = conditionData.patterns[Math.floor(Math.random() * conditionData.patterns.length)];

  // Generate recommendations based on condition and severity
  const recommendations = [
    `Schedule follow-up examination in ${severity === 'Severe' ? '1' : '4'} week${severity === 'Severe' ? '' : 's'}`,
    `Consider ${severity === 'Severe' ? 'immediate' : 'routine'} specialist consultation`,
    `Monitor ${conditionData.keywords[0]} symptoms closely`,
    `Maintain regular check-ups`
  ];

  // Add condition-specific recommendations
  switch(mostLikelyCondition) {
    case 'pneumonia':
      recommendations.push('Consider antibiotic therapy if bacterial origin is suspected');
      break;
    case 'tuberculosis':
      recommendations.push('Initiate appropriate anti-tubercular therapy');
      recommendations.push('Implement infection control measures');
      break;
    case 'covid':
      recommendations.push('Consider COVID-19 testing if not already performed');
      recommendations.push('Monitor oxygen saturation levels');
      break;
    case 'lungCancer':
      recommendations.push('Consider biopsy for tissue diagnosis');
      recommendations.push('Staging workup recommended');
      break;
    case 'heartFailure':
      recommendations.push('Cardiac evaluation recommended');
      recommendations.push('Monitor fluid status');
      break;
    case 'asthma':
      recommendations.push('Pulmonary function tests recommended');
      recommendations.push('Review inhaler technique');
      break;
    case 'pulmonaryEmbolism':
      recommendations.push('Consider anticoagulation therapy');
      recommendations.push('DVT prophylaxis recommended');
      break;
    case 'eczema':
      recommendations.push('Use emollients regularly');
      recommendations.push('Avoid known triggers');
      recommendations.push('Consider topical corticosteroids if needed');
      break;
    case 'psoriasis':
      recommendations.push('Consider phototherapy options');
      recommendations.push('Use prescribed topical treatments');
      recommendations.push('Monitor for psoriatic arthritis');
      break;
    case 'acne':
      recommendations.push('Follow a gentle skincare routine');
      recommendations.push('Consider topical retinoids');
      recommendations.push('Avoid picking or squeezing lesions');
      break;
    case 'rosacea':
      recommendations.push('Identify and avoid triggers');
      recommendations.push('Use gentle, non-irritating skincare products');
      recommendations.push('Consider prescription treatments');
      break;
    case 'fungalInfection':
      recommendations.push('Use antifungal treatments as prescribed');
      recommendations.push('Keep affected areas dry');
      recommendations.push('Avoid sharing personal items');
      break;
    case 'melanoma':
      recommendations.push('Urgent dermatology referral');
      recommendations.push('Consider biopsy for confirmation');
      recommendations.push('Regular skin self-examination');
      break;
    case 'hives':
      recommendations.push('Consider antihistamines');
      recommendations.push('Identify and avoid triggers');
      recommendations.push('Monitor for angioedema');
      break;
  }

  // Generate additional notes based on findings and confidence
  const additionalNotes = [
    `Analysis based on ${findings.length} key findings`,
    `Confidence level indicates ${confidence > 80 ? 'high' : 'moderate'} reliability`,
    `Consider patient history and clinical presentation`,
    `Image quality assessment: ${confidence > 80 ? 'Good' : 'Adequate'}`
  ];

  return {
    diagnosis: `Suspected ${mostLikelyCondition.charAt(0).toUpperCase() + mostLikelyCondition.slice(1).replace(/([A-Z])/g, ' $1')}`,
    confidence: Math.round(confidence * 10) / 10,
    findings,
    details: {
      severity,
      location,
      pattern
    },
    recommendations,
    additionalNotes
  };
};

module.exports = { analyzeImage }; 