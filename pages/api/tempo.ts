import type { NextApiRequest, NextApiResponse } from 'next'
import * as Effect from "@effect/io/Effect"
import { getAudioFeatures } from '../../lib/spotify'
import { pipe } from '@effect/data/Function'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const fetchAudioFeatures = (id: string) => Effect.tryCatchPromise(
        () => getAudioFeatures(id),
        (error) => Effect.fail(error)
    )

    const getJson = (res: Response) =>
    Effect.tryCatchPromise(
    () => res.json() as Promise<unknown>, // Promise<any> otherwise
    () => "json" as const,
  );

    const jason = pipe(fetchAudioFeatures(req.query.id as string), Effect.flatMap(getJson))

    
    return res.status(200).send(jason)
}
