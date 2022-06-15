# react-nivo-slider

## Introduce

### Basic

<code
  src="./demo/Default.tsx"
  title="basic"
/>

### Theme

<code
  src="./demo/theme.tsx"
  title="theme"
/>

### Effect

<code
  src="./demo/effect.tsx"
  title="effect"
/>

### Custom Effect

<code
  src="./demo/custom-effect.tsx"
  title="custom effect"
/>

## API

### Swiper props

| props | description | type | default |
| :-- | :-- | :-- | :-- |
| className | - | string | - |
| style | - | CSSProperties | - |
| theme | theme | `default` \| `light` \| `dark` \| `bar` | default |
| effect | transition effect | [EffectType](./#effecttype) | random |
| slices | swiper slice | number | 15 |
| boxCols | box col num | number | 8 |
| boxRows | - | number | 4 |
| animSpeed | animation duration(ms) | number | 500 |
| pauseTime | - | number | 3000 |
| startSlide | - | number | 0 |
| directionNav | show directionNav | boolean | true |
| controlNav | show controlNav | boolean | true |
| controlNavThumbs | show controlNavThumbs | boolean | false |
| pauseOnHover | - | boolean | true |
| manualAdvance | - | boolean | false |
| prevText | prev button text | string | Prev |
| nextText | next button text | string | nextText |
| randomStart | - | boolean | false |
| beforeChange | before slide change | function | - |
| afterChange | after slide change | function | - |
| afterLoad | after swiper init | function | - |
| lastSlide | before last slide start animation | function | - |
| slideshowEnd | on last slide show | function | - |

### Link

same as a tag

### Image

| props      | description                | type                        | default |
| :--------- | :------------------------- | :-------------------------- | :------ |
| className  | -                          | string                      | -       |
| style      | -                          | CSSProperties               | -       |
| alt        | -                          | string                      | -       |
| title      | caption inner text or node | string \| node              | -       |
| transition | -                          | [EffectType](./#effecttype) | -       |

### EffectType

```
type EffectType =
  | 'random'
  | `fade`
  | `fold`
  | `sliceDown`
  | `sliceDownRight`
  | `sliceDownLeft`
  | `sliceUp`
  | `sliceUpRight`
  | `sliceUpLeft`
  | `sliceUpDown`
  | `sliceUpDownLeft`
  | `sliceUpDownRight`
  | `slideInRight`
  | `slideInLeft`
  | `boxRandom`
  | `boxRain`
  | `boxRainReverse`
  | `boxRainGrow`
  | `boxRainGrowReverse`;
```
