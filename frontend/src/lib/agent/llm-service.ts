import type { AgentAction } from './action-executor';
import { extractDOMContext } from './dom-parser';

export interface LLMResponse {
  reply: string;
  actions: AgentAction[];
}

/**
 * A mock LLM service that uses if/else logic to simulate an AI understanding 
 * Vietnamese user intent and generating DOM actions.
 */
export async function processUserIntent(userInput: string, context: ReturnType<typeof extractDOMContext>): Promise<LLMResponse> {
  const input = userInput.toLowerCase();
  const actions: AgentAction[] = [];
  let reply = '';

  // Simulate network delay of an LLM API call
  await new Promise(resolve => setTimeout(resolve, 800));

  // --- Scenario 1: Navigation ---
  if (input.includes('vào trang') || input.includes('mở') || input.includes('đi tới')) {
    if (input.includes('chuyển tiền')) {
      reply = 'Đang chuyển đến trang Chuyển tiền cho bạn.';
      actions.push({ type: 'navigate', target: 'transfer', description: 'Mở trang chuyển tiền' });
    } 
    else if (input.includes('tiết kiệm') || input.includes('tiền gửi')) {
      reply = 'Đang mở trang Tiết kiệm.';
      actions.push({ type: 'navigate', target: 'savings', description: 'Mở trang tiết kiệm' });
    }
    else if (input.includes('tài khoản')) {
      reply = 'Đang mở mục quản lý Tài khoản.';
      actions.push({ type: 'navigate', target: 'accounts', description: 'Mở trang tài khoản' });
    }
    else {
      reply = 'Xin lỗi, tôi chưa rõ bạn muốn mở trang nào. Bạn có thể nói rõ hơn không?';
    }
    return { reply, actions };
  }

  // --- Scenario 2: Transfer Money Flow ---
  if (context.page === 'transfer') {
    if (input.includes('chuyển') || input.includes('nhập')) {
      // Very basic extraction of amount (e.g. "500k", "500 ngàn", "1 triệu")
      if (input.includes('100k') || input.includes('100 ngàn')) {
        actions.push({ type: 'click', target: 'quick-amount-100000', description: 'Chọn nhanh 100K' });
        reply = 'Đã chọn số tiền 100,000 VND. Bạn vui lòng bấm Tiếp tục nhé.';
      }
      else if (input.includes('500k') || input.includes('500 ngàn')) {
        actions.push({ type: 'click', target: 'quick-amount-500000', description: 'Chọn nhanh 500K' });
        actions.push({ type: 'click', target: 'next-step', description: 'Bấm Tiếp tục' });
        reply = 'Đã tự động điền 500,000 VND và chuyển sang bước Xác nhận cho bạn.';
      }
      else {
        // Try to match a number
        const numberMatch = input.match(/(\d+)/);
        if (numberMatch) {
          const val = numberMatch[1];
          let finalVal = val;
          if (input.includes('k') || input.includes('ngàn')) finalVal = val + '000';
          if (input.includes('triệu')) finalVal = val + '000000';
          
          actions.push({ type: 'type', target: 'amount-input', value: finalVal, description: `Nhập số tiền ${finalVal}` });
          reply = `Đã điền số tiền ${finalVal} VND vào hệ thống.`;
        } else {
          reply = 'Bạn muốn chuyển bao nhiêu tiền?';
        }
      }
      return { reply, actions };
    }
    
    if (input.includes('tiếp tục')) {
      actions.push({ type: 'click', target: 'next-step', description: 'Bấm nút Tiếp tục' });
      reply = 'Đã bấm Tiếp tục.';
      return { reply, actions };
    }
    
    if (input.includes('xác nhận') || input.includes('giọng nói')) {
      if (context.actions.includes('voice-confirm-transfer')) {
        actions.push({ type: 'click', target: 'voice-confirm-transfer', description: 'Chọn xác thực bằng giọng nói' });
        reply = 'Mở xác thực bằng giọng nói.';
      } else {
        actions.push({ type: 'click', target: 'confirm-transfer', description: 'Bấm nút Xác nhận' });
        reply = 'Đã bấm Xác nhận giao dịch.';
      }
      return { reply, actions };
    }
  }

  // --- Default Fallback ---
  reply = 'Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể nói "Mở trang chuyển tiền" hoặc "Chuyển 500 ngàn" nếu bạn đang ở trang Chuyển tiền.';
  return { reply, actions };
}
