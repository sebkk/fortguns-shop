enum DURATION {
  'D300' = 'duration-300',
}

enum TIMING_FUNC {
  'ease-in-out' = 'ease-in-out',
}

export const insertTransition = (
  property: string,
  duration?: keyof typeof DURATION,
  timingFunc?: keyof typeof TIMING_FUNC,
) => {
  let transition = '';

  if (timingFunc) transition = `${TIMING_FUNC[timingFunc]}`;
  if (duration) transition = `${DURATION[duration]} ${transition}`;
  if (property) transition = `${property} ${transition}`;

  return transition;
};
