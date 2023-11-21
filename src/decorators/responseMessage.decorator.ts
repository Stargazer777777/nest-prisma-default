import { Reflector } from '@nestjs/core';

// export const MessageMetaKey = 'responseMessage';

// export function Message(msg: string): MethodDecorator {
//   return () => {
//     SetMetadata(MessageMetaKey, msg);
//   };
// }

export const Message = Reflector.createDecorator<string>();
