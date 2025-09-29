"use client";

export default function FeautredCard() {
  const features = [
    {
      title: "Unreal Engine",
      subtitle: "Built for Unreal. Trusted by community.",
      description:
        "Our 3D assets are optimized for real-time performance, cinematic visuals, and seamless import into Unreal Engine. Packed with clean geometry, organized hierarchies, and UE-friendly materials for instant integration into your workflow.",
      video: "/unreal.mp4",
    },
    {
      title: "Blender",
      subtitle: "Native Blender files, made with creators in mind.",
      description:
        "All assets come with clean topology, real-world scale, and materials fully set up in the Shader Editor. No conversion, no fixing. Drop in and build your scene.",
      video: "/blender.mp4",
    },
    {
      title: "3DS MAX",
      subtitle: "3DS MAX support done right.",
      description:
        "Each file is cleanly grouped, correctly scaled, and render-engine–friendly. Materials are pre-assigned, naming is structured, and everything is ready for layout, lighting, or export without manual cleanup.",
      video: "/3dmax.mp4",
    },
  ];

  return (
    <main className="min-h-screen mt-10 text-slate-200 px-6 pt-12 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl orbitron font-bold text-white mb-2">
            Features
          </h1>
          <p className="text-slate-400 exo max-w-2xl mx-auto">
            Discover a curated set of features built for creators and developers. Every asset is optimized to save time, boost performance, and fit seamlessly into your workflow.
          </p>
        </header>

        {/* Cards */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="group white-border rounded-2xl shadow-lg overflow-hidden border border-white/10 max-w-[360px] w-full mx-auto transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="p-6 flex flex-col gap-4">
                {/* Video */}
                <div className="w-30 h-30 rounded-xl overflow-hidden bg-black/40 mx-auto">
                  <video
                    src={f.video}
                    className="w-full h-full object-contain"
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    aria-hidden="true"
                  />
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold orbitron text-white text-center mt-2">
                  {f.title}
                </h3>
                {f.subtitle && (
                  <p className="text-sm text-slate-300 exo text-center font-medium">
                    {f.subtitle}
                  </p>
                )}
                <p className="text-sm text-slate-400 mt-2 exo leading-relaxed text-center">
                  {f.description}
                </p>

                
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
