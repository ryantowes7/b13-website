// website/src/pages/about-us.jsx
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import AboutBanner from '@/components/about/AboutBanner';

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content/about');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.about) {
            setAboutData(data.about);
          }
        } else {
          throw new Error('Failed to fetch about data');
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError(err.message);
        // Set default data if fetch fails
        setAboutData({
          banner_title: 'About B13 Factory',
          banner_subtitle: 'Specialist dalam garment dan advertising dengan pengalaman lebih dari 5 tahun',
          company_title: 'Garment & Advertising Specialist',
          company_description: '**B13 Factory** telah berdiri sejak 2019 dan telah dipercaya oleh berbagai klien.',
          company_stats: {
            years_experience: '5+',
            projects_completed: '150+',
            happy_clients: '50+'
          },
          mission: {
            title: 'Mission',
            description: 'Memberikan solusi garment dan advertising terbaik dengan kualitas premium.'
          },
          vision: {
            title: 'Vision',
            description: 'Menjadi partner terpercaya dalam industri garment dan advertising di Indonesia.'
          },
          values: {
            title: 'Values',
            description: 'Integritas, kualitas, dan kepuasan pelanggan adalah nilai utama kami.'
          },
          team_sections: [
            { name: 'Management Team', role: 'Professional & Experienced', description: 'Tim management yang berpengalaman.' },
            { name: 'Production Team', role: 'Skilled Craftsmen', description: 'Tim produksi yang ahli.' },
            { name: 'Design Team', role: 'Creative & Innovative', description: 'Tim design kreatif.' }
          ],
          why_choose_us: [
            { title: 'Quality Materials', description: 'Menggunakan bahan berkualitas terbaik' },
            { title: 'Expert Team', description: 'Tim berpengalaman dan profesional' },
            { title: 'Competitive Price', description: 'Harga kompetitif dengan kualitas premium' },
            { title: 'Fast Delivery', description: 'Proses cepat tanpa mengorbankan kualitas' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>About Us - B13 Factory</title>
        </Head>
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
          <div className="container-custom text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/90">Memuat halaman...</p>
          </div>
        </section>
      </>
    );
  }

  // Prepare values array from aboutData
  const values = aboutData ? [
    {
      icon: <Target className="w-8 h-8" />,
      title: aboutData.mission?.title || 'Mission',
      description: aboutData.mission?.description || ''
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: aboutData.vision?.title || 'Vision', 
      description: aboutData.vision?.description || ''
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: aboutData.values?.title || 'Values',
      description: aboutData.values?.description || ''
    }
  ] : [];

  // Get team sections from aboutData
  const team = aboutData?.team_sections || [];

  return (
    <>
      <Head>
        <title>About Us - B13 Factory</title>
        <meta name="description" content="Tentang B13 Factory - Specialist garment dan advertising dengan pengalaman lebih dari 5 tahun" />
      </Head>

      {/* Banner Section */}
      <AboutBanner banner={aboutData} />

      {/* Company Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
                {aboutData?.company_title || 'Garment & Advertising Specialist'}
              </h2>
              <div className="space-y-4 text-neutral-700 prose prose-lg max-w-none">
                {aboutData?.company_description ? (
                  <div dangerouslySetInnerHTML={{ __html: aboutData.company_description.replace(/\n/g, '<br />') }} />
                ) : (
                  <>
                    <p>
                      <strong>B13 Factory</strong> telah berdiri sejak 2019 dan telah dipercaya oleh berbagai klien 
                      dari berbagai industri untuk memenuhi kebutuhan garment dan advertising mereka.
                    </p>
                    <p>
                      Kami mengkhususkan diri dalam jasa sablon, bordir, dan berbagai produk advertising 
                      seperti banner, spanduk, dan merchandise promosi.
                    </p>
                    <p>
                      Dengan tim yang profesional dan berpengalaman, kami siap membantu mewujudkan 
                      ide dan konsep Anda menjadi produk yang berkualitas dan bernilai.
                    </p>
                  </>
                )}
              </div>

              {aboutData?.company_stats && (
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">{aboutData.company_stats.years_experience}</div>
                    <div className="text-neutral-600">Tahun Pengalaman</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-600 mb-2">{aboutData.company_stats.projects_completed}</div>
                    <div className="text-neutral-600">Project Selesai</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-500 mb-2">{aboutData.company_stats.happy_clients}</div>
                    <div className="text-neutral-600">Klien Puas</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start justify-center lg:justify-end">
              {aboutData?.company_image ? (
                <div className="rounded-2xl overflow-hidden shadow-lg w-full aspect-square max-w-md">
                  <img 
                    src={aboutData.company_image} 
                    alt="B13 Factory Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 aspect-square flex items-center justify-center w-full max-w-md">
                  <div className="text-center">
                    <Users className="w-24 h-24 text-primary-600 mx-auto mb-6" />
                    <p className="text-xl font-semibold text-neutral-700">Company Image/Logo</p>
                    <p className="text-neutral-600 mt-2">B13 Factory Team</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
              Our Principles
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Pedoman yang menjadi dasar setiap pekerjaan dan layanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-neutral-900">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
              Our Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Tim profesional yang siap membantu mewujudkan kebutuhan garment dan advertising Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-12 h-12 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                <p className="text-neutral-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose B13 Factory?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(aboutData?.why_choose_us || []).map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button href="/contact-us" variant="secondary" size="lg">
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}