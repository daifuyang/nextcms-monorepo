
import response from '@/app/lib/response';
// withErrorHandle 高阶函数
export default function withErrorHandle<P extends any[], R>(
    fn: (...args: P) => Promise<R>
  ): (...args: P) => Promise<any> {
    return async (...args: P) => {
      try {
        // 执行传入的异步函数
        return await fn(...args);
        // 如果成功，返回成功的响应
      } catch (error: any) {
        // 如果发生错误，记录错误并返回错误响应
        return response.error(error?.message || "服务器错误");
      }
    };
  }