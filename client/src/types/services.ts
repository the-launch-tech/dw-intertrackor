import * as React from 'react'

import { Model } from './data'

export type Create<M> = { prefix?: string; body: M }
export type Find = { prefix?: string }
export type Data<D> = Model<D>
