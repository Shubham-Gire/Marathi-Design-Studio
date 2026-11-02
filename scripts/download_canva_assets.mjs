import fs from 'fs';
import path from 'path';

const downloads = [
  {
    name: 'grand_opening_festival.png',
    url: 'https://export-download.canva.com/24OCo/DAHZeY24OCo/-1/0/0001-4363382732758285440.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH4R7NKVBA%2F20261030%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261030T085917Z&X-Amz-Expires=10744&X-Amz-Signature=218850788b2e2490d2fe1bb9999f05f9c01ae3e16fee652a98fb24e8f6fcbf79&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2030%20Oct%202026%2011%3A58%3A21%20GMT'
  },
  {
    name: 'traditional_wedding_poster.png',
    url: 'https://export-download.canva.com/vOtSE/DAHY2zvOtSE/-1/0/0001-5519681938722545965.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH4R7NKVBA%2F20261029%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261029T163705Z&X-Amz-Expires=68761&X-Amz-Signature=576e33a46c64c86a6ccf9909f3711b84190b88fbb03c6bc663e0ebd7edb0793f&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2030%20Oct%202026%2011%3A43%3A06%20GMT'
  },
  {
    name: 'balasaheb_tribute_banner.png',
    url: 'https://export-download.canva.com/WRprU/DAHUVIWRprU/-1/0/0001-659172042694698199.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH4R7NKVBA%2F20261029%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261029T170816Z&X-Amz-Expires=66990&X-Amz-Signature=7d6916b49d98592c89251e236bee7f7042bfd4e28d20eed0342300ee841b2177&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2030%20Oct%202026%2011%3A44%3A46%20GMT'
  },
  {
    name: 'property_dot_com.png',
    url: 'https://export-download.canva.com/AkG2U/DAHXmvAkG2U/-1/0/0001-6108527587611741877.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH4R7NKVBA%2F20261029%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261029T191821Z&X-Amz-Expires=58055&X-Amz-Signature=380ea3ddae167634d40283e62ca56a80389cf39b78d0a195eb62b95adab36ba0&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Fri%2C%2030%20Oct%202026%2011%3A25%3A56%20GMT'
  }
];

const destDir = path.resolve('frontend/public/templates/canva');

async function run() {
  for (const item of downloads) {
    try {
      console.log(`Downloading ${item.name}...`);
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`Failed to download ${item.name}: ${res.status} ${res.statusText}`);
        continue;
      }
      const buffer = await res.arrayBuffer();
      const outPath = path.join(destDir, item.name);
      fs.writeFileSync(outPath, Buffer.from(buffer));
      console.log(`Saved ${item.name} (${buffer.byteLength} bytes) to ${outPath}`);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e);
    }
  }
}

run();
