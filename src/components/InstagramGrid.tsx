const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAb_f3YX9fuZJ9hnUQVAsRHzwo6zA0KnIiPyGKQe15E0Sc6W9wQujmrfosSd8bXTNiuJPZnBfBqlUU_TbtQHUWglqoWqnpqFKZRD1NWdGaHyk4NqdIbjbyNTTI7b0Nbmd8UcEBjw17dxAW0azlzPJ1r_H7K_4u__FOJVYC5pUUfoQmlFgZhQGmEkGego6T2KNJ6cVRPfZnwZO9RxDLLipjZTeyVJ8ibXB1PHlCsXqFsEMS23qqoSPTA3FVDE-ADvpEq2sJ4ggr0GrgR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAgpK0ZaO0it6bEHqgiFNbgMgYdZ9Vie83TAWszDPjhsPXu0BtjrGI0jji7M2GWopJCO639ATKGDosdouLx5f0j1AFQm75djkSjACFN_PWfrj6lr-nwB_m1vIiJWMa6WRfxAoBvUBI4WEusWLivQ7FFml0nYgqPn-wQP_7DQJlQb9sAc7mCWUMLQX1Jv6CilVeEeJaM9qicfQH9YN-JpWDTwjvZ6E8m1QWjLpDwpaMGVK2V5spwBGVMcFzixfnSM77VhIKLaWjl5ikC",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBb5lqjbraByMlKbBIIkm9FcBEeCbhxjm6LcBeJ7ZkWf6pwDO7xy418vEsWaesLclolGuV3W3vFWSg2beBeg4lqN7wX0d-oXu9Dtvll6Q0FctVFR3-85N3bATTD1Ygy29D2mQjlGbPnXBL9l67Zeye6MoqsReWed5A-1ZpHxHvUAkUefBWnwpTkOLTWPABx-FVpJrh64uMYlOOqFpGB1E-A9uBGi6SuWgux6UB4ScUI0bljtqy3s_nE_GDRSeZ_tLohBOpv6mRRMEm9",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB2ALa9IG2bJz5w1KPYdBksgZ8dfzYfbtFA66brPyjM0GsIsqVSZyS5yVL5q9Om5IZ02I_fsrVu67BDcQvGpM-yOdqeY-0TQliYZRPk2w3KO4iFWYvXcf8gYNknE3PqwsDVtkdxqNfCOZ5sCT2oqbZB7CYq2KtiHEcwIWMegCr-eiBPQwqQlj6lHBwEsDu0HV8uvgq90IBDEVExqpKRTN6jzoJAZaMQGVpMUYzylMroFCUCYGUhQYmGrBgSmN1E8VoHwMr9xAsx7BJW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMT48KJ2SMuPf4gIKLHPdb0vRxyvXFXQbA7RBbkrnRb-FBApLtqZ2n57-Z2A8DMvnDKuW35_vaJ4c0dQmZehCTIrSUdIVd4VhLYZXDYOgdEc0IUxfWRP4h4zo9VAlmXk3PvZ0q1Z5Ras7fa8eEJjnOc2x7726zSOYhTQ8T4C7Th3RATLST1ttTi6JC5YvsWXrEq5VgPCY2x66AZ_c0g0WZy8iMHiClC81MeE0-BJvhEnVYEY-XBKDb-aHUOuBE7c3yIdL7ltMPfc2Q",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD5ToAo8rVC6k5Gqy2gBhdr8CPuwwG82hYp5FgsDqLWgphqznIKEewak7oM16POnHYLQbgtJfTNmrmynTEDWOmB4TolbD8dgC2jKv6WPqvBEYbdzzDlo9N3P1wPVL0Owc3hggzbQi0Hcd4FJBHgB-2WXTbTx2CxPMpHWu-HBctiXlvOEA-HWF_ylUa74_5R85Ej8ScGc97OaAkzahw5sZYhWgnxYh6gtV094NnQhntA7Gt_IR-zyKIe1tDbMKG3mH0nT2RifyL2TYGn",
];

export default function InstagramGrid() {
  return (
    <section className="bg-background-light py-16 px-6">
      <div className="max-w-[1440px] mx-auto text-center">
        <h4 className="uppercase tracking-[0.4em] text-[10px] font-bold mb-8">
          Follow us on Instagram
        </h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {images.map((src, i) => (
            <div key={i} className="aspect-square bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover" src={src} alt={`Instagram ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
