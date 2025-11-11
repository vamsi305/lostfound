// University images mapping (official logos and campus photos)
const universityImages = {
    // IITs
    'IIT Bombay': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
    'IIT Delhi': 'https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg',
    'IIT Madras': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png',
    'IIT Kanpur': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/IIT_Kanpur_Logo.svg/1200px-IIT_Kanpur_Logo.svg.png',
    'IIT Kharagpur': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/1200px-IIT_Kharagpur_Logo.svg.png',
    'IIT Roorkee': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Indian_Institute_of_Technology_Roorkee_logo.png/220px-Indian_Institute_of_Technology_Roorkee_logo.png',
    'IIT Guwahati': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Indian_Institute_of_Technology_Guwahati_Logo.svg/1200px-Indian_Institute_of_Technology_Guwahati_Logo.svg.png',
    'IIT Hyderabad': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Indian_Institute_of_Technology%2C_Hyderabad_Logo.png/220px-Indian_Institute_of_Technology%2C_Hyderabad_Logo.png',
    'IIT Indore': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/35/IIT_Indore_Logo.svg/1200px-IIT_Indore_Logo.svg.png',
    'IIT BHU (Varanasi)': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/IIT_%28BHU%29_Varanasi_Logo.svg/1200px-IIT_%28BHU%29_Varanasi_Logo.svg.png',
    
    // NITs
    'NIT Trichy': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/43/NIT_Trichy_Logo.png/220px-NIT_Trichy_Logo.png',
    'NIT Surathkal (Karnataka)': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/NITK_Surathkal_logo.png/220px-NITK_Surathkal_logo.png',
    'NIT Warangal': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/NIT_Warangal_logo.png/220px-NIT_Warangal_logo.png',
    'NIT Calicut': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/National_Institute_of_Technology%2C_Calicut_Logo.png/220px-National_Institute_of_Technology%2C_Calicut_Logo.png',
    'NIT Rourkela': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/NIT_Rourkela_Colour_logo.svg/1200px-NIT_Rourkela_Colour_logo.svg.png',
    
    // IIITs
    'IIIT Hyderabad': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/IIIT_Hyderabad_Logo.svg/1200px-IIIT_Hyderabad_Logo.svg.png',
    'IIIT Bangalore': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/IIIT_Bangalore_Official_Logo.png/220px-IIIT_Bangalore_Official_Logo.png',
    'IIIT Delhi': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/IIIT_Delhi_Logo.svg/1200px-IIIT_Delhi_Logo.svg.png',
    'IIIT Allahabad': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Indian_Institute_of_Information_Technology%2C_Allahabad_Logo.png/220px-Indian_Institute_of_Information_Technology%2C_Allahabad_Logo.png',
    
    // IIMs
    'IIM Ahmedabad': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Indian_Institute_of_Management_Ahmedabad_Logo.svg/1200px-Indian_Institute_of_Management_Ahmedabad_Logo.svg.png',
    'IIM Bangalore': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/IIM_Bangalore_Logo.svg/1200px-IIM_Bangalore_Logo.svg.png',
    'IIM Calcutta': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Indian_Institute_of_Management_Calcutta_Logo.svg/1200px-Indian_Institute_of_Management_Calcutta_Logo.svg.png',
    'IIM Lucknow': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/IIM_Lucknow_Logo.svg/1200px-IIM_Lucknow_Logo.svg.png',
    
    // Other Top Universities
    'Delhi University': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/DU_Logo.svg/1200px-DU_Logo.svg.png',
    'Jawaharlal Nehru University (JNU)': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Jawaharlal_Nehru_University_logo.svg/1200px-Jawaharlal_Nehru_University_logo.svg.png',
    'Anna University': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png',
    'Banaras Hindu University (BHU)': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Banaras_Hindu_University_coat_of_arms.png/220px-Banaras_Hindu_University_coat_of_arms.png',
    'Aligarh Muslim University (AMU)': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Aligarh_Muslim_University_logo.svg/1200px-Aligarh_Muslim_University_logo.svg.png',
    'University of Hyderabad': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/University_of_Hyderabad_seal.svg/1200px-University_of_Hyderabad_seal.svg.png',
    'Jadavpur University': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Jadavpur_University_Logo.svg/1200px-Jadavpur_University_Logo.svg.png',
    'Jamia Millia Islamia': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Jamia_Millia_Islamia_Logo.svg/1200px-Jamia_Millia_Islamia_Logo.svg.png',
    
    // Deemed Universities
    'BITS Pilani': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png',
    'Vellore Institute of Technology (VIT)': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/1200px-Vellore_Institute_of_Technology_seal_2017.svg.png',
    'Manipal Academy of Higher Education': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/Manipal_Academy_of_Higher_Education_Logo.png/220px-Manipal_Academy_of_Higher_Education_Logo.png',
    'Thapar Institute of Engineering and Technology': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Thapar_Institute_of_Engineering_and_Technology_logo.png/220px-Thapar_Institute_of_Engineering_and_Technology_logo.png',
    'SRM Institute of Science and Technology': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/SRM_Institute_of_Science_and_Technology_logo.svg/1200px-SRM_Institute_of_Science_and_Technology_logo.svg.png',
    'Amity University': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Amity_University_logo.svg/1200px-Amity_University_logo.svg.png',
    'Lovely Professional University (LPU)': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Lovely_Professional_University_logo.png/220px-Lovely_Professional_University_logo.png',
    
    // Default image for universities without specific images
    'default': 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop'
};

module.exports = universityImages;
