// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Projects } from '@models/projects'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  projects: Projects
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    "projects": [
      {
        "id": 1,
        "title": "Central Plano Assistencial",
        "source": "Personal client",
        "slug": "central",
        "categories": [
          {
            "id": 1,
            "name": "Design",
            "slug": "design"
          },
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
          {
            "id": 3,
            "name": "Back-end",
            "slug": "back"
          }
        ],
        "releaseYear": 2020,
        "url": "https://lucasalmeida.dev/clientes/central/",
        "thumbnail": "/projects/2020_central.png"
      },
      {
        "id": 2,
        "title": "ONU Haters Pro Bem",
        "source": "Slinshot Digital",
        "slug": "hatersprobem",
        "categories": [
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          }
        ],
        "releaseYear": 2020,
        "url": "/data/2020/hatersprobem/index.html",
        "thumbnail": "/projects/2020_hatersprobem.png"
      },
      {
        "id": 3,
        "title": "Phaza Alimentos",
        "source": "Personal client",
        "slug": "phaza",
        "categories": [
          {
            "id": 1,
            "name": "Design",
            "slug": "design"
          },
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
          {
            "id": 3,
            "name": "Back-end",
            "slug": "back"
          }
        ],
        "releaseYear": 2020,
        "url": "/data/2020/phaza/index.html",
        "thumbnail": "/projects/2020_phaza.png"
      },
      {
        "id": 4,
        "title": "Rainoah",
        "source": "Personal client",
        "slug": "rainoah",
        "categories": [
          {
            "id": 1,
            "name": "Design",
            "slug": "design"
          },
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
          {
            "id": 3,
            "name": "Back-end",
            "slug": "back"
          }
        ],
        "releaseYear": 2020,
        "url": "https://lucasalmeida.dev/clientes/rainoah/",
        "thumbnail": "/projects/2020_rainoah.png"
      },
      {
        "id": 5,
        "title": "Trade Stars",
        "source": "Estúdio FFW",
        "slug": "trade-stars",
        "categories": [
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
          {
            "id": 3,
            "name": "Back-end",
            "slug": "back"
          }
        ],
        "releaseYear": 2020,
        "url": "/data/2020/tradestars/index.html",
        "thumbnail": "/projects/2020_tradestars.png"
      },
      {
        "id": 6,
        "title": "Vinícola Guaravera",
        "source": "Personal client",
        "slug": "guaravera",
        "categories": [
          {
            "id": 1,
            "name": "Design",
            "slug": "design"
          },
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
          {
            "id": 3,
            "name": "Back-end",
            "slug": "back"
          }
        ],
        "releaseYear": 2020,
        "url": "https://vinicolaguaravera.com.br/",
        "thumbnail": "/projects/2020_guaravera.png"
      },
      {
        "id": 7,
        "title": "Coleção Camisas Lunender",
        "source": "Estúdio Blanka",
        "slug": "lunender",
        "categories": [
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
        ],
        "releaseYear": 2019,
        "url": "/data/2019/colecao-camisas/index.html",
        "thumbnail": "/projects/2019_colecao-camisas.png"
      },
      {
        "id": 8,
        "title": "Conquer Consórcios",
        "source": "Personal client",
        "slug": "conquer",
        "categories": [
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
        ],
        "releaseYear": 2019,
        "url": "/data/2019/conquer/index.html",
        "thumbnail": "/projects/2019_conquer.png"
      },
      {
        "id": 9,
        "title": "Hangar 33",
        "source": "Estúdio Blanka",
        "slug": "hangar33",
        "categories": [
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
        ],
        "releaseYear": 2019,
        "url": "/data/2019/hangar33/index.html",
        "thumbnail": "/projects/2019_hangar33.png"
      },
      {
        "id": 10,
        "title": "Jeans Pilot",
        "source": "Estúdio Blanka",
        "slug": "jeanspilot",
        "categories": [
          {
            "id": 2,
            "name": "Front-end",
            "slug": "front"
          },
        ],
        "releaseYear": 2019,
        "url": "/data/2019/jeanspilot/index.html",
        "thumbnail": "/projects/2019_jeanspilot.png"
      }
    ]
  })
}
