"use client";

import { FormEvent, useState } from "react";

function useSubmitMessage() {
  const [message, setMessage] = useState("");
  const submit = async (payload: Record<string, string>, form: HTMLFormElement) => {
    setMessage("正在收好你的想法…");
    const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) return setMessage("暂时没能提交，请稍后再试。");
    form.reset(); setMessage("收到。我们会认真读完，再给你答案。✓");
  };
  return { message, submit };
}

export function LeadForm() {
  const { message, submit } = useSubmitMessage();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
    submit(Object.fromEntries(data.entries()) as Record<string, string>, form);
  };
  return (
    <form className="planner-form" onSubmit={onSubmit}>
      <div className="field-row"><label>怎么称呼你？<input name="name" placeholder="你的名字" required /></label><label>想去哪里？<input name="destination" placeholder="城市 / 海边 / 还没想好" required /></label></div>
      <div className="field-row"><label>准备玩几天？<select name="days" defaultValue=""><option value="" disabled>选择天数</option><option>2—3 天</option><option>4—6 天</option><option>7 天以上</option></select></label><label>人均预算？<select name="budget" defaultValue=""><option value="" disabled>选择预算</option><option>¥2,000 以内</option><option>¥2,000—5,000</option><option>¥5,000—10,000</option><option>¥10,000 以上</option></select></label></div>
      <label>接收建议的邮箱<input name="email" type="email" placeholder="you@example.com" required /></label>
      <label>还有什么想告诉我们？<textarea name="note" placeholder="比如：喜欢慢一点、不想自驾、想住得好一点……" rows={3} /></label>
      <input type="hidden" name="source" value="route-planner" />
      <button className="button button-primary full" type="submit">提交我的旅行想法 <span>↗</span></button>
      <p className="form-message" aria-live="polite">{message}</p>
    </form>
  );
}

export function NewsletterForm() {
  const { message, submit } = useSubmitMessage();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); submit({ email: String(data.get("email")), source: "newsletter" }, form); };
  return <form className="newsletter-form" onSubmit={onSubmit}><div><input type="email" name="email" required placeholder="你的邮箱" /><button aria-label="订阅" type="submit">→</button></div><p aria-live="polite">{message || "不追热点，不发垃圾邮件，随时可以离开。"}</p></form>;
}
