export function logMessage(context: string, msg: string, metadata?: any) {
  return {
    context: context,
    msg: msg,
    metadata: metadata,
  };
}
