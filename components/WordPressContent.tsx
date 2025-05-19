import { getPage, WordPressPage } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

interface NavItem {
  label: string;
  link: string | null;
}

export default async function WordPressContent({ pageId }: any) {
  const page = await getPage(pageId);

  if (!page) {
    return <div>No content found</div>;
  }

  const navLinks = (page?.acf?.header?.nav_links?.[0] as any) || {};

  return (
    <>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <header className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-orange-500 font-bold text-xl">
                {page?.acf?.header?.logo?.logo_text}
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {Object.entries(navLinks).map(([key, item]) => {
                if (!(item as any).link) return null;

                return (
                  <Link
                    key={key}
                    href={(item as NavItem).link || '#'}
                    className="text-sm hover:text-orange-500"
                  >
                    {(item as NavItem).label}
                  </Link>
                );
              })}
            </nav>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href={page?.acf?.header?.cta?.header_cta_link || '#'}>
                {page?.acf?.header?.cta?.cta_text}
              </Link>
            </Button>
          </div>
        </header>
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="container mx-auto py-16 px-4 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  {page?.acf?.hero_section?.title}
                </h1>
                <p className="text-gray-400 mb-8">
                  {page?.acf?.hero_section?.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href={page?.acf?.hero_section?.primary_cta?.link || '#'}>
                  {page?.acf?.hero_section?.primary_cta?.text}
                  </Link>
                   
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800"
                    asChild
                  >
                    <Link href={page?.acf?.hero_section?.secondary_cta?.link || '#'}>
                    {page?.acf?.hero_section?.secondary_cta?.text}
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-6">
                  <div className="flex flex-wrap gap-6">
                    {page?.acf?.hero_section?.highlights?.[0] &&
                      Object.entries(page.acf.hero_section.highlights[0]).map(
                        ([key, highlight]: [string, any]) => (
                          <div key={key} className="flex items-center gap-2">
                            <img
                              src={highlight.icon || ''}
                              alt={highlight.text || ''}
                              width={16}
                              height={16}
                              className="text-orange-500"
                            />
                            <span className="text-sm text-gray-400">
                              {highlight.text}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg aspect-square flex items-center justify-center">
                <Image
                  src={page?.acf?.hero_section?.hero_image?.img?.url}
                  alt="Bookkeeping illustration"
                  width={400}
                  height={400}
                  className="p-8"
                />
              </div>
            </div>
          </section>
          {/* Services Section */}
          <section id="services" className="bg-gray-900 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                  {page?.acf?.services?.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">
                  {page?.acf?.services?.title}s
                </h2>
                <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                  {page?.acf?.services?.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* BAS Support */}
                {page?.acf?.services?.service_card?.map((service: { icon: string | Blob | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; cta: {
                  cta_url: string; cta_text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; 
}; }, i: Key | null | undefined) => {
                  return (
                    <div className="bg-gray-800 rounded-lg p-8" key = {i}>
                      <div className="text-orange-500 mb-4">
                        <img
                          src={service?.icon}
                          width={36}
                          height={36}
                          className="text-orange-500"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {service?.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {service?.description}
                      </p>
                      <Button
                        variant="link"
                        className="text-orange-500 p-0 h-auto"
                      >
                        <Link href={service?.cta?.cta_url || '#'}>
                        {service?.cta?.cta_text}
                        </Link>
                      </Button>
                    </div>
                  );
                })}

              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="container mx-auto py-16 md:py-24 px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-800 rounded-lg aspect-square flex items-center justify-center">
                <Image
                  src={page?.acf?.why_choose_us?.image?.url}
                  alt={page?.acf?.why_choose_us?.image?.title}
                  width={400}
                  height={400}
                  className="p-8"
                />
              </div>
              <div>
                <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                  {page?.acf?.why_choose_us?.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  {page?.acf?.why_choose_us?.title}
                </h2>
                <p className="text-gray-400 mb-8">
                  {page?.acf?.why_choose_us?.description}
                </p>

                <div className="space-y-8">
                  {page?.acf?.why_choose_us?.reasons?.map((reason:any, i:number) => (
                    <div className="flex gap-4" key = {i}>
                      <div className="text-orange-500 mt-1">
                        <Image
                          src={reason.icon}
                          alt={reason.title}
                          width={36}
                          height={36}
                          // className="text-orange-500"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          {reason.title}    
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {reason.description}
                          of experience across multiple industries.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
           {/* Testimonials */}
        <section className="bg-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
                {page?.acf?.testimonials?.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                {page?.acf?.testimonials?.title}
              </h2>
              <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                {page?.acf?.testimonials?.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Testimonial 1 */}

              {page?.acf?.testimonials?.testimonys?.map((testimonial:any, i:number) => (
                 <div className="bg-gray-800 rounded-lg p-6" key = {i}>
                 <div className="flex items-center mb-4">
                   <div className="w-10 h-10 rounded-full bg-gray-700 mr-3 overflow-clip object-cover">
                    <Image
                      src={testimonial.image?.url}
                      alt={testimonial.image?.filename}
                      width={36}
                      height={36}
                    />
                   </div>
                   <div>
                     <h4 className="font-semibold">{testimonial.name}</h4>
                     <p className="text-gray-400 text-xs">{testimonial.occupation}</p>
                   </div>
                 </div>
                 <div className="text-orange-500 mb-3">
                   {Array.from({ length: parseInt(testimonial.ratings) || 5 }, (_, i) => (
                     <span key={i}>★</span>
                   ))}
                 </div>
                 <p className="text-gray-400 text-sm">
                  {testimonial.description}
                 </p>
               </div>
              ))}
              
            </div>
          </div>
        </section>
         {/* Contact Section */}
         <section id="contact" className="container mx-auto py-16 md:py-24 px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {page?.acf?.contact_us?.title}
              </h2>
              <p className="text-gray-400 mb-8">
                {page?.acf?.contact_us?.subtitle}
              </p>

              <div className="space-y-6">
                {page?.acf?.contact_us?.contact_details?.map((contact:any, i:number) => (
                    <div className="flex items-center gap-4" key = {i}>
                    <div className="bg-orange-500/10 p-3 rounded-full">
                      <img src={contact?.icon} alt={contact?.icon} width={24} height={24} /> 
                    </div>
                    <div>
                      <h3 className="font-semibold">{contact?.label}</h3>
                      <p className="text-gray-400">{contact?.details}</p>
                    </div>
                  </div>
                ))}
               
              </div>
              <div className="flex gap-4 mt-8">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href={page?.acf?.contact_us?.primary_cta?.link || '#'}>
                  <Image src={page?.acf?.contact_us?.primary_cta?.icon} alt={page?.acf?.contact_us?.primary_cta?.text} width={16} height={16} />
                  {page?.acf?.contact_us?.primary_cta?.text}
                  </Link>
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  <Image src={page?.acf?.contact_us?.secondary_cta?.icon} alt={page?.acf?.contact_us?.secondary_cta?.text} width={16} height={16} />
                  <Link href={page?.acf?.contact_us?.secondary_cta?.link || '#'}>
                  {page?.acf?.contact_us?.secondary_cta?.text}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-6">{page?.acf?.contact_us?.contact_form?.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{page?.acf?.contact_us?.contact_form?.subtitle}</p>

              <form className="space-y-4">
               {
                  page?.acf?.contact_us?.contact_form?.form?.map((field:any, i:number) => (
                    <div key = {i}>
                      <label htmlFor={field?.label} className="block text-sm font-medium mb-1">
                        {field?.label}
                      </label>
                      {field?.field_type === 'textarea' ? (
                        <Textarea
                          id={field?.label}
                          placeholder={field?.placeholder}
                          className="bg-gray-700 border-gray-600 min-h-[100px]"
                        />
                      ) : field?.field_type === 'input' ? (
                        <Input
                          id={field?.label}
                          type={field?.input_type || 'text'}
                          placeholder={field?.placeholder}
                          className="bg-gray-700 border-gray-600"
                        />
                      ) : null}
                    </div>
                  ))
                } 
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">{page?.acf?.contact_us?.contact_form?.submit_button_text}</Button>
              </form>
            </div>
          </div>
        </section>
        </main>
        <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-orange-500 font-bold text-xl">{page?.acf?.footer?.logo}</span>
              <span className="text-gray-400 text-sm ml-2">
                {page?.acf?.footer?.copyright_text}
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              {
                page?.acf?.footer?.footer_links?.map((link:any, i:number) => (
                  <Link href={link?.link} className="hover:text-white" key = {i}>
                    {link?.label}
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
