import { motion } from 'framer-motion';
import Card from '../../../components/ui/Card.tsx';
import Button from '../../../components/ui/Button.tsx';
import Badge from '../../../components/ui/Badge.tsx';
import { useLLMStore } from '../store/useLLMStore.ts';

export default function TemperatureControl() {
  const { temperature, setTemperature } = useLLMStore();

  const getTemperatureDescription = (temp: number): string => {
    if (temp < 0.5) return "Very Focused (High Determinism)";
    if (temp < 0.8) return "Focused";
    if (temp < 1.2) return "Balanced";
    if (temp < 1.5) return "Creative";
    return "Very Creative (High Exploration)";
  };

  const getTemperatureColor = (): string => {
    if (temperature < 0.8) return "from-blue-400 to-blue-600";
    if (temperature < 1.2) return "from-green-400 to-green-600";
    return "from-orange-400 to-red-500";
  };

  const getTemperatureBadgeVariant = (): 'info' | 'success' | 'warning' => {
    if (temperature < 0.8) return 'info';
    if (temperature < 1.2) return 'success';
    return 'warning';
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Temperature Control</h3>
        <div className="flex items-center gap-2">
          <Badge variant={getTemperatureBadgeVariant()}>
            {getTemperatureDescription(temperature)}
          </Badge>
          <span className="font-mono text-lg font-medium text-text-primary">
            {temperature.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Custom Slider */}
        <div className="relative">
          <div className="relative h-12 bg-gray-100 rounded-xl overflow-hidden">
            <motion.div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getTemperatureColor()} opacity-30`}
              animate={{ width: `${((temperature - 0.1) / 1.9) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-primary"
              animate={{ left: `calc(${((temperature - 0.1) / 1.9) * 100}% - 12px)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>0.1</span>
            <span>1.0</span>
            <span>2.0</span>
          </div>
        </div>

        {/* Description */}
        <motion.div
          key={getTemperatureDescription(temperature)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg"
        >
          <p className="text-sm font-medium text-text-primary">
            {getTemperatureDescription(temperature)}
          </p>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTemperatureColor()}`}
          />
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-2 rounded-lg border transition-all ${
              temperature < 0.7
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-gray-50 text-text-secondary'
            }`}
          >
            <strong className="flex items-center gap-1">
              <Badge variant="info">Low</Badge>
              0.1-0.7
            </strong>
            <p className="mt-1 opacity-90">Predictable, picks likely words</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-2 rounded-lg border transition-all ${
              temperature >= 0.8 && temperature <= 1.2
                ? 'border-green-300 bg-green-50 text-green-700'
                : 'border-gray-200 bg-gray-50 text-text-secondary'
            }`}
          >
            <strong className="flex items-center gap-1">
              <Badge variant="success">Med</Badge>
              0.8-1.2
            </strong>
            <p className="mt-1 opacity-90">Balanced creativity</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-2 rounded-lg border transition-all ${
              temperature > 1.3
                ? 'border-orange-300 bg-orange-50 text-orange-700'
                : 'border-gray-200 bg-gray-50 text-text-secondary'
            }`}
          >
            <strong className="flex items-center gap-1">
              <Badge variant="warning">High</Badge>
              1.3-2.0
            </strong>
            <p className="mt-1 opacity-90">Random, creative output</p>
          </motion.div>
        </div>

        {/* Reset Button */}
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setTemperature(1.0)}
        >
          Reset to Default (1.0)
        </Button>
      </div>
    </Card>
  );
}
