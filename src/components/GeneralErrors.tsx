import { useState, useMemo } from "react";
import {
  Menu,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  X,
  Clock,
  Filter,
  ChevronDown,
} from "lucide-react";
import { allErrors, MachineError, machines } from "../data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface GeneralErrorsProps {
  onMenuClick: () => void;
}

type FilterPeriod = "24h" | "48h" | "1week" | "all";

export function GeneralErrors({ onMenuClick }: GeneralErrorsProps) {
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("24h");
  const [selectedError, setSelectedError] = useState<MachineError | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<
    "all" | "critical" | "warning" | "info"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "resolved"
  >("active");

  // Filter errors based on time period
  const filteredByTime = useMemo(() => {
    const now = new Date("2025-09-17T15:30:00");
    const cutoffTime = new Date(now);

    switch (filterPeriod) {
      case "24h":
        cutoffTime.setHours(cutoffTime.getHours() - 24);
        break;
      case "48h":
        cutoffTime.setHours(cutoffTime.getHours() - 48);
        break;
      case "1week":
        cutoffTime.setDate(cutoffTime.getDate() - 7);
        break;
      case "all":
        cutoffTime.setFullYear(cutoffTime.getFullYear() - 10);
        break;
    }

    return allErrors.filter((error) => new Date(error.timestamp) >= cutoffTime);
  }, [filterPeriod]);

  // Apply additional filters
  const filteredErrors = useMemo(() => {
    return filteredByTime.filter((error) => {
      const matchesSeverity =
        severityFilter === "all" || error.severity === severityFilter;
      const matchesStatus =
        statusFilter === "all" || error.status === statusFilter;
      return matchesSeverity && matchesStatus;
    });
  }, [filteredByTime, severityFilter, statusFilter]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700";
      case "info":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "chemistry":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400";
      case "hematology":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "immunology":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date("2025-09-17T15:30:00");
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-[#c41e3a] dark:hover:text-[#e84855]"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            General Errors
          </h1>
          <div className="flex-1" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor all machine errors across your laboratory
        </p>
        <div className="h-1 bg-gradient-to-r from-[#c41e3a] via-[#b8860b] to-[#003366] dark:from-[#e84855] dark:via-[#ffd700] dark:to-[#4a90e2] rounded-full mt-4" />
      </div>

      {/* Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {(["24h", "48h", "1week", "all"] as FilterPeriod[]).map(
              (period) => (
                <button
                  key={period}
                  onClick={() => setFilterPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterPeriod === period
                      ? "bg-gradient-to-r from-[#c41e3a] to-[#8b1e3f] dark:from-[#e84855] dark:to-[#c75b7a] text-white shadow-lg"
                      : "bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#c41e3a] dark:hover:border-[#e84855]"
                  }`}
                >
                  {period === "24h" && "Last 24 Hours"}
                  {period === "48h" && "Last 48 Hours"}
                  {period === "1week" && "Last 7 Days"}
                  {period === "all" && "All Time"}
                </button>
              )
            )}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-[#c41e3a] dark:text-[#e84855] hover:underline font-medium"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
          Advanced Filters
        </button>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-[#2a2a2a] rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Severity
                </label>
                <div className="space-y-2">
                  {(["all", "critical", "warning", "info"] as const).map(
                    (sev) => (
                      <label
                        key={sev}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="severity"
                          value={sev}
                          checked={severityFilter === sev}
                          onChange={(e) =>
                            setSeverityFilter(e.target.value as any)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {sev === "all" ? "All Severities" : sev}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  {(["all", "active", "resolved"] as const).map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={statusFilter === status}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {status === "all" ? "All Statuses" : status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredErrors.length} error
        {filteredErrors.length !== 1 ? "s" : ""} in selected period
      </div>

      {/* Errors List */}
      <div className="space-y-4">
        {filteredErrors.length === 0 ? (
          <div className="bg-white dark:bg-[#2a2a2a] rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Errors Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All systems operating normally in the selected period.
            </p>
          </div>
        ) : (
          filteredErrors.map((error) => (
            <button
              key={error.id}
              onClick={() => setSelectedError(error)}
              className="w-full bg-white dark:bg-[#2a2a2a] rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all text-left hover:border-[#c41e3a] dark:hover:border-[#e84855]"
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityColor(
                    error.severity
                  )}`}
                >
                  {getSeverityIcon(error.severity)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {error.errorType}
                      </h3>
                      <Badge
                        className={`${getSeverityColor(
                          error.severity
                        )} text-xs font-medium capitalize`}
                      >
                        {error.severity}
                      </Badge>
                      {error.status === "resolved" && (
                        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                          Resolved
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {error.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Machine Info */}
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getCategoryColor(
                          error.machineCategory
                        )} text-xs font-medium capitalize`}
                      >
                        {error.machineCategory}
                      </Badge>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {error.machineName}
                      </span>
                    </div>

                    {/* Related Errors */}
                    {error.relatedErrorCount > 0 && (
                      <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded">
                        +{error.relatedErrorCount} similar
                      </span>
                    )}

                    {/* Time */}
                    <div className="flex items-center gap-1 ml-auto text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(error.timestamp)}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-gray-400">
                  <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Error Detail Modal */}
      <ErrorDetailDialog
        error={selectedError}
        onClose={() => setSelectedError(null)}
        machines={machines}
      />
    </div>
  );
}

interface ErrorDetailDialogProps {
  error: MachineError | null;
  onClose: () => void;
  machines: typeof machines;
}

function ErrorDetailDialog({
  error,
  onClose,
  machines,
}: ErrorDetailDialogProps) {
  if (!error) return null;

  const machine = machines.find((m) => m.id === error.machineId);
  const hasRange =
    error.lowRange !== undefined && error.highRange !== undefined;

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 dark:bg-red-900/20";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20";
      default:
        return "bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <Dialog
      open={!!error}
      onOpenChange={(open: boolean) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityBgColor(
                error.severity
              )}`}
            >
              {error.severity === "critical" && (
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              )}
              {error.severity === "warning" && (
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              )}
              {error.severity === "info" && (
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{error.errorType}</DialogTitle>
              <Badge
                className={`${
                  error.severity === "critical"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : error.severity === "warning"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                } mt-2 capitalize`}
              >
                {error.severity}
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-base mt-2">
            {error.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Error Code and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Error Code
              </h4>
              <p className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                {error.errorCode}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Status
              </h4>
              <Badge
                className={`${
                  error.status === "active"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                } capitalize`}
              >
                {error.status}
              </Badge>
            </div>
          </div>

          {/* Machine Information */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Machine Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Machine Name:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {error.machineName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Machine ID:
                </span>
                <span className="font-medium text-gray-900 dark:text-white font-mono">
                  {error.machineId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Category:
                </span>
                <Badge
                  className={`${
                    error.machineCategory === "chemistry"
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                      : error.machineCategory === "hematology"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                  } capitalize`}
                >
                  {error.machineCategory}
                </Badge>
              </div>
              {machine && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Model:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {machine.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Location:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {machine.location}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Test Range & Recent Values */}
          {(hasRange ||
            (error.recentValues && error.recentValues.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hasRange && (
                <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Expected Range
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {error.lowRange} – {error.highRange} {error.units || ""}
                  </p>
                  {error.primaryTestName && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Test: {error.primaryTestName}
                      {error.primaryTestCode
                        ? ` (Code: ${error.primaryTestCode})`
                        : ""}
                    </p>
                  )}
                </div>
              )}

              {error.recentValues && error.recentValues.length > 0 && (
                <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Recent Values (last 6)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {error.recentValues.map((val, idx) => (
                      <Badge
                        key={idx}
                        className={`text-xs ${
                          hasRange &&
                          (val < (error.lowRange ?? -Infinity) ||
                            val > (error.highRange ?? Infinity))
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {val}
                        {error.units ? ` ${error.units}` : ""}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pattern Classification */}
          {error.errorPattern && (
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Pattern Analysis
              </h4>
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  className={`${
                    error.errorPattern === "systematic"
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                  } capitalize`}
                >
                  {error.errorPattern} error
                </Badge>
                {error.westgardRule && (
                  <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {error.westgardRule}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {error.patternExplanation}
              </p>
            </div>
          )}

          {/* Timestamp and Related Errors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Timestamp
              </h4>
              <p className="text-sm text-gray-900 dark:text-white">
                {new Date(error.timestamp).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Similar Errors
              </h4>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {error.relatedErrorCount} in period
              </p>
            </div>
          </div>

          {/* Affected Tests */}
          {error.affectedTests && error.affectedTests.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Affected Tests
              </h4>
              <div className="flex flex-wrap gap-2">
                {error.affectedTests.map((test) => (
                  <Badge
                    key={test}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {test}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Possible Causes */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Possible Causes
            </h4>
            <div
              className={`${getSeverityBgColor(
                error.severity
              )} rounded-lg p-4 space-y-2`}
            >
              {error.possibleCauses.map((cause, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-[#c41e3a] dark:text-[#e84855] font-bold flex-shrink-0">
                    •
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">{cause}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Solutions */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Suggested Solutions
            </h4>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 space-y-2">
              {error.suggestedSolutions.map((solution, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold flex-shrink-0">
                    {index + 1}.
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">{solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          {error.aiInsight && (
            <div className="bg-[#fff8f0] dark:bg-[#2a2a2a] border border-[#c41e3a]/20 dark:border-[#e84855]/30 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                AI Insight
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {error.aiInsight}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
              For persistent issues, contact your equipment service provider or
              refer to the machine's technical documentation.
            </p>
            <Button className="w-full bg-gradient-to-r from-[#c41e3a] to-[#8b1e3f] hover:from-[#b01832] hover:to-[#7a1935] text-white">
              View Machine Details
            </Button>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
