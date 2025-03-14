import React, { useState } from 'react';
import { ArrowRight, Book, Users, Globe, Award, X } from 'lucide-react';

const index = () => {

  const stats = [
    { number: "700+", label: "Happy Students" },
    { number: "100%", label: "Board Results" },
    { number: "10+", label: "Activities" },
    { number: "25+", label: "Expert Teachers" }
  ];

  
  const features = [
    {
      title: "Modern Curriculum",
      description: "Internationally recognized curriculum focusing on practical knowledge and skills development.",
      icon: <Book className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Expert Faculty",
      description: "Dedicated teachers with extensive experience in nurturing young minds.",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art infrastructure including smart classrooms and sports facilities.",
      icon: <Globe className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm text-blue-600 mb-4">Welcome to Excellence in Education</div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Education: The Best Investment 
                For a <br/>
                Brighter Tomorrow
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                Providing quality education with modern facilities and<br />
                holistic development for children aged 3-18 years.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2">
                  Admission Enquiry
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="bg-white text-gray-800 px-8 py-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                  Virtual Tour
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">15+</div>
                      <div className="text-sm text-gray-600">Years of Excellence</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">98%</div>
                      <div className="text-sm text-gray-600">Academic Excellence</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Book className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 transform rotate-6 rounded-3xl" />
              <img
                src="heroImage.jpg"
                alt="Students in classroom"
                className="relative rounded-3xl w-full object-cover"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose {{ schoolName }}?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-24 bg-white rounded-3xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* <TestimonialSection/> */}
        </div>
      </div>
    </div>
  );
};

export default index;