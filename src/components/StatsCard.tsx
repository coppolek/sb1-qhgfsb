import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  subtitleColor?: string;
}

export const StatsCard = ({ title, value, subtitle, subtitleColor = 'text-green-600' }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      <div className={`mt-2 text-sm ${subtitleColor}`}>{subtitle}</div>
    </div>
  );
}