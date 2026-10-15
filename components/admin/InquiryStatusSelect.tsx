"use client";

export default function InquiryStatusSelect({
  defaultValue,
}: {
  defaultValue: string;
}) {
  return (
    <select
      name="status"
      defaultValue={defaultValue}
      onChange={(e) => e.target.form?.requestSubmit()}
      className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] text-xs text-white rounded px-2 py-1 focus:border-accent-purple outline-none"
    >
      <option value="new">New</option>
      <option value="reviewing">Reviewing</option>
      <option value="contacted">Contacted</option>
      <option value="proposal">Proposal</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
      <option value="rejected">Rejected</option>
      <option value="closed">Closed</option>
    </select>
  );
}
