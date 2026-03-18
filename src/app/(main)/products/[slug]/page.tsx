import ProductGallery from "@/components/ProductGallery";
import ProductOptions from "@/components/ProductOptions";
import ProductAccordion from "@/components/ProductAccordion";
import { getProductBySlug } from "@/lib/woocommerce";
import { notFound } from "next/navigation";

const FALLBACK_PRODUCT = {
  name: "Zinnia Noir",
  price: "PKR 45,000",
  category: "Pret",
  description:
    "A breathtaking noir ensemble featuring intricate floral embroideries and hand-embellished details on premium organza. Designed for the woman who appreciates the intersection of heritage craftsmanship and modern silhouettes.",
  mainImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD-02NM8Cr8_nul5v9EfIY1ZCbsT85OI7oIcXrqEwM4PjJay1jYbukrx585BwlDsrLCxE7d4EXefQVK_rRV5X76X1ONeVEko27UDLDhKFlVchepTDGcwkIpaE3o4om1lhCQNveacJ21JG6M7H3Ay417uAKqNfG3Rpf8sdG4MBbLv2J3EfojMWXAZqhmrf_1GbWkp1xalNfZ_iCZWEVS7KZw2W3w4kP_VKDvTBraYR3wre2benhPFgYtO-do_AwQ8i-3UYWVAQmeLFmU",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBPESV2zUvkbONrNk5v_pmeO3FSQ-iPZLfO2X_hT7J75BBMN4RjJJgZbL0Hz7cavlyXUiaA-JJp8gN6VRh_VpNHPbHCDuQLpvR3hWKSjV03GyfATUNJI9BdXB4roX_G7Ldm_qqLsyuiGV1Ls9fhLNWzbUNM_UYcfehyBqAD9S0u5Fw533dxwyTJAT24WKPPahW7ETyH1LQty5zi6wfusFnEYZfTvDH7Q2F7e8nnFpEHEXH4X-8ECoIk1LqJXku6DOf5oLKcFYtilkcX",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCfUGh45DnrtC3rYpJ1G1NQNeYYlOCAS_J_ghwRWJbWrXLRJRXG7i5byahE5WaPf0dSAJ_Qp5y2LV1Hmrvtb_P8bf2hUOhxU61KQrjN0_Px_Qt1_cdek027DPENpCmkUaXDVv7msD9A7z1nMyaaB6DxbOlcwgh0i9hA3dKbS7JhrxENYWEu8ZQfNCT5s-7GMd_DuT4NiqZ739Ep8EbdKQ9pwx93uuyibnRfhvxX7G3p_5vQ-Z_9OKB7pR6XtanuuySV3mV5c2smFZbk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCCU5sD6ORwpJxn2cm7y_ONUdc-17WpCHiHItbzP8umE2fwpsIQiJ6OoNFtDj6AjCXjqbmvmYPh4vkyPLlphl2C5NXo_w6MScgldXpLFGXP1MIkOK9jg1MBAVoD4ZDVKSyIUvS_aSxSYOwcJ04vdN_VR9qJNdI1fwthug8-wdKreJil7rCZcMnpKpKiVkMuHvWPFCJK8Xj8LsIr01GLwVvwyo1rFLtrK5TjiA6JUEArTLh3iX1lBBWBaYFzwmCS0ucCnTnHvG52jUrq",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAR-G8osebJThF8gq2dLncKeg2gG-RPoh0vhD9qiDEDqHe4eFH-PgQ5B-1EsDjA6FFg5wUOX1kMdAL-b9Mu9CRM90QeDhTtUMuR1lva-VvYAl9U2dCWhyNzx57prwTJwchHAEGLF0cnCmnQAlMJ_QkAUw7q80R-Fz-oNN1IAY4hznKJAQwdC5GqKoUDrq0KOeDikClwSk18CU3hY-CQ7cTi9KQwwIe3gRZCc8YHuib2qz_GuqK8_A5xJVqw9SiYEktkH2fFEspiuTjb",
  ],
};

const RELATED = [
  {
    id: "1",
    name: "Blush Petals",
    price: "PKR 38,500",
    badge: "New Arrival",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPIu79wg_3P8lhQlEys84wv3-2cIg4gtJfLO9EVxjf5qxdGrswodAPRzTWqwp6HIpcB84I6WC2FOSNqa-oOhVYMiu4c931RgvYPnoxwcM6e3QTxPc6vvHjzb8_--7uckzHBirfmq1IkSsUcrG0u6pwt_4dj5ZqkhpQNDVI3AH8cf1cx3_o7ecaxdXOtYDRSACWOLB9zAFvVKn09rTMaJr-sQJqyU0JFewiMtAeVvlgL7BiuwbcVHRHArWbqb5pzMUtyxEF9joR_T6J",
  },
  {
    id: "2",
    name: "Emerald Dream",
    price: "PKR 52,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCA1tFC107ZCitWXnAgSqzTQUfxSDSmAdW9bcTzEYtYPRHvJvVfYNP0kargMjSvEQMcaMFuod82A-9FxBK_Ggrq2gR8Xbfx5_8t0fdf5XkyBMeEaBMoYV4r44eAZx9pvjPtcFNuve9E4EBgm6666ORgQhQI4DjijIWaCqGG2I4ft8BsgSoUn_2iBoiJe_OO3jNTmhVakAV_2GWjcN1DBCVIngCtSQDPvkaVQErOubbglFdTiJXIZM6n2_OYK-R8uuDpkam_Mr0iHVfI",
  },
  {
    id: "3",
    name: "Midnight Azure",
    price: "PKR 49,900",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChVAGjWvYfbFoOeOcU8995vT5JxmmvDr78p07eJgJXZnXv9TKISmGv7WZLAIt53ogXIYaO6aM9vPS6eMl3eldshk2MbejGb122TL7tWOVbxWWVR3ZD8-gM33ECw-Bi0luiOZKo-iGeYjrmWHqOA0x96DJAhFK7cuXFb960KaMQKrHmxYTH83QbcqEcn0KUhKNu2Vxlv2-Rmm7QeGprtCG_VVZnfAgvHbVsP_4uKh29FC3UhbU89DqzkiSPeiMoyHEw46UoKjef9ycy",
  },
  {
    id: "4",
    name: "Ivory Elegance",
    price: "PKR 41,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5OIYKFtcqPlnivuwlEQiTrkcRdvlxqPcj_broinaw7_yRMUN-U0nfkYA60uW76n6bI52Jla6Ngtmj564nKf45NpWAwDZH2GilOuG_amXKxuP_nukd3RvULHRh5b7WCKAmXkWWi2zJu8wlK17264uwvuO0jjiS_ZaX1QkvuD9zd-vGq1swc5iy-1NpWdj5bcnWcPHOvfaheA02xsgEJTYj1Xy5K5HaLClbN-p2o1RaR0aVjkskSLx_oPOu8yLEwDctXB4oA0NcBZVz",
  },
];

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  let productData = null;
  const wcProduct = await getProductBySlug(slug);

  if (wcProduct) {
    productData = {
      id: wcProduct.id.toString(),
      name: wcProduct.name,
      price: `PKR ${parseInt(wcProduct.price || "0").toLocaleString()}`,
      numericPrice: parseInt(wcProduct.price || "0"),
      category: wcProduct.categories?.[0]?.name || "Uncategorized",
      description: wcProduct.description?.replace(/<[^>]*>?/gm, "") || wcProduct.short_description?.replace(/<[^>]*>?/gm, "") || "",
      mainImage: wcProduct.images?.[0]?.src || "https://placehold.co/600x800?text=No+Image",
      images: wcProduct.images?.length > 1 ? wcProduct.images.map((img: any) => img.src) : [wcProduct.images?.[0]?.src || "https://placehold.co/600x800?text=No+Image"]
    };
  } else {
    // Fallback if not hooked up in wordpress layer or not found
    productData = {
      id: slug,
      name: FALLBACK_PRODUCT.name,
      price: FALLBACK_PRODUCT.price,
      numericPrice: parseInt(FALLBACK_PRODUCT.price.replace(/[^\d]/g, ''), 10),
      category: FALLBACK_PRODUCT.category,
      description: FALLBACK_PRODUCT.description,
      mainImage: FALLBACK_PRODUCT.mainImage,
      images: FALLBACK_PRODUCT.images,
    };
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">

      {/* Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Gallery */}
        <ProductGallery
          images={productData.images}
          mainImage={productData.mainImage}
          productName={productData.name}
        />

        {/* Product Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Breadcrumb */}
          <nav className="flex text-xs uppercase tracking-widest text-slate-500 gap-2">
            <a className="hover:text-primary transition-colors" href="/">Home</a>
            <span>/</span>
            <a className="hover:text-primary transition-colors" href="#">{productData.category}</a>
            <span>/</span>
            <span className="text-slate-900">{productData.name}</span>
          </nav>

          {/* Name & Price */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-display text-slate-900 mb-2">
              {productData.name}
            </h1>
            <p className="text-2xl font-medium text-primary">{productData.price}</p>
          </div>

          {/* Description */}
          <p className="text-slate-600 leading-relaxed">{productData.description}</p>

          {/* Size Selector + CTA */}
          <ProductOptions
            product={{
              id: productData.id,
              name: productData.name,
              price: productData.numericPrice,
              image: productData.mainImage,
            }}
          />

          {/* Accordions */}
          <ProductAccordion />
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-24">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-black font-display mb-3">You May Also Like</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {RELATED.map((item) => (
            <a key={item.id} href="#" className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-white text-background-dark text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                    {item.badge}
                  </div>
                )}
              </div>
              <h4 className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors uppercase">
                {item.name}
              </h4>
              <p className="text-primary font-medium text-sm">{item.price}</p>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
