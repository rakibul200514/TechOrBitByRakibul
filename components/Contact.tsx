
import React from 'react';
import { Mail, Phone, Instagram, MapPin, Send } from 'lucide-react';
import { CONTACT_INFO } from '../constants.tsx';
import { Card, CardBody } from './ui/Card.tsx';
import { Button } from './ui/Button.tsx';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
        <p className="text-gray-500 dark:text-gray-400">Have questions? We're here to help you on your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">WhatsApp</h4>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    +91 {CONTACT_INFO.whatsapp}
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Email</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-blue-600 hover:underline">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600">
                  <Instagram size={24} />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Instagram</h4>
                  <a href={`https://instagram.com/${CONTACT_INFO.instagram}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    @{CONTACT_INFO.instagram}
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Location</h4>
                  <p className="text-gray-500">Assam, India</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" className="w-full p-3 rounded-lg border border-gray-200 dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full p-3 rounded-lg border border-gray-200 dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-gray-200 dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-blue-500" placeholder="What is this regarding?" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea rows={6} className="w-full p-3 rounded-lg border border-gray-200 dark:bg-slate-700 dark:border-slate-600 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your message here..."></textarea>
                </div>
                <Button fullWidth className="gap-2">
                  <Send size={18} /> Send Message
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
