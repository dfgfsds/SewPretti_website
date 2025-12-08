"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useVendor } from '@/context/VendorContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import ApiUrls from '@/api-endpoints/ApiUrls';
import { useQuery } from '@tanstack/react-query';
import { getVendorDeliveryDetailsApi } from '@/api-endpoints/authendication';

export default function ContactPage() {
  const { vendorId }: any = useVendor();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    mobile: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMessage] = useState('');

  const getVendorDeliveryDetailsData: any = useQuery({
    queryKey: ['getVendorDeliveryDetailsData', vendorId],
    queryFn: () => getVendorDeliveryDetailsApi(`${vendorId}`),
    enabled: !!vendorId
  })
  const VendorDetails = getVendorDeliveryDetailsData?.data?.data || [];

  // ✅ Email validation function
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // ✅ Email handler
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });

    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
    } else if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  // ✅ Mobile handler with validation
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // allow only digits
    if (value.length <= 10) {
      setFormData({ ...formData, subject: value });
    }

    if (!value) {
      setErrors((prev) => ({ ...prev, mobile: 'Mobile number is required' }));
    } else if (value.length < 10) {
      setErrors((prev) => ({ ...prev, mobile: 'Mobile number must be 10 digits' }));
    } else {
      setErrors((prev) => ({ ...prev, mobile: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.email || errors.mobile) return;

    setLoading(true);
    setSuccessMessage('');

    const payload: any = {
      name: formData.name,
      email: formData.email,
      contact_number: formData.subject,
      description: formData.message,
      vendor_id: vendorId,
    };

    try {
      const res = await axios.post(ApiUrls?.sendQuote, payload);
      const msg = res?.data?.message || 'Message sent successfully!';
      toast.success(msg);
      setSuccessMessage(msg);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error(error?.response || error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const MapEmbed: React.FC = () => {
    return (
      <div className="w-full h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.1042114577212!2d78.14651292374862!3d11.687026438522583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf05623ba4099%3A0xfd4173c20b3da3ed!2sMittapudur%2C%20Salem%2C%20Tamil%20Nadu%20636016!5e0!3m2!1sen!2sin!4v1765000155910!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            {/* <p className="text-xl text-white/90">
              We'd love to hear from you
            </p> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="Mobile">Mobile</Label>
                <Input
                  id="Mobile"
                  value={formData.subject}
                  onChange={handleMobileChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[150px]"
                  required
                />
              </div>
              {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
              <Button disabled={loading} type="submit" className="w-full bg-red-400 hover:bg-red-500">
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:pl-12">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
               Have a question about sizes, product availability, or your order? Our support team is always ready to help you with anything you need. Reach out through any of the options below!
            </p>


            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-red-400 mr-4" />
                <div>
                  <h3 className="font-semibold mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    273/7 Marriyamman
                    kovil Street, Convent  Road
                    Mittaputhur
                    Mittaputhur : 636016
                  </p>
                </div>
              </div>

              {VendorDetails?.vendor_other_details?.support_contact && (
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-red-400 mr-4" />
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-muted-foreground">
                      +91{VendorDetails?.vendor_other_details?.support_contact|| "9876543210"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-red-400 mr-4" />
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-muted-foreground">
                    sewprettibypreethi@gmail.com
                  </p>
                </div>
              </div>

              {/* <div className="flex items-start">
                <Clock className="h-6 w-6 text-[#D9951A] mr-4" />
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div> */}
            </div>

            {/* Map */}
            <div className="mt-12 bg-[#F8F7F2] rounded-xl flex items-center justify-center">
              <MapEmbed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}