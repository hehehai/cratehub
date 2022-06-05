// eslint-disable-next-line @typescript-eslint/ban-types
export const gitHubInjection = (cb: any) => {
  if (!cb) {
    throw new Error('Missing argument callback');
  }

  if (typeof cb !== 'function') {
    throw new TypeError('Callback is not a function');
  }

  document.addEventListener('pjax:end' as any, cb);
  cb();
};
