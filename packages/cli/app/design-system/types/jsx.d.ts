import { ElementType, ComponentProps } from 'react'
import { JsxStyleProps, Assign } from '.'
import { RecipeDefinition, RecipeSelection, RecipeVariantRecord, RecipeRuntimeFn } from './recipe'

type Dict = Record<string, unknown>

type AdditionalHtmlProps = {
  htmlSize?: string | number
  htmlWidth?: string | number
  htmlHeight?: string | number
  htmlTranslate?: 'yes' | 'no' | undefined
}

type Polyfill<T> = Omit<T, 'color' | 'translate' | 'transition' | 'width' | 'height' | 'size'> & AdditionalHtmlProps

type Props<T extends Dict, P extends Dict = {}> = Assign<Polyfill<T>, P>

export type PandaComponent<T extends ElementType, P extends Dict = {}> = {
  (props: Props<ComponentProps<T>, P> & JsxStyleProps): JSX.Element
  displayName?: string
}

export type Panda = {
  <T extends ElementType, P extends RecipeVariantRecord = {}>(component: T, recipe?: RecipeDefinition<P> | RecipeRuntimeFn<P>): PandaComponent<T, RecipeSelection<P>>
} & { [K in keyof JSX.IntrinsicElements]: PandaComponent<K, {}> }

export type HTMLPandaProps<T extends ElementType> = Polyfill<ComponentProps<T>> & JsxStyleProps