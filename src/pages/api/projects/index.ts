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
        "source": "Own project",
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
        "description": "Projetop",
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
        "description": "Projetop",
        "url": "/data/2020/hatersprobem/index.html",
        "thumbnail": "/projects/2020_hatersprobem.png"
      }
    ]
  })
}
