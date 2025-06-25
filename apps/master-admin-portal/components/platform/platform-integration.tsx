
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ExternalLink, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlatformIntegrationProps {
  title: string
  description: string
  platformUrl: string
  fallbackContent?: React.ReactNode
}

export default function PlatformIntegration({ 
  title, 
  description, 
  platformUrl, 
  fallbackContent 
}: PlatformIntegrationProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  useEffect(() => {
    // Simulate loading and health check
    const timer = setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, randomly determine if platform is available
      setHasError(Math.random() > 0.8) // 20% chance of error for demo
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setHasError(false)
    setLastRefresh(new Date())
    
    setTimeout(() => {
      setIsLoading(false)
      setHasError(Math.random() > 0.9) // Lower chance of error on refresh
    }, 1000)
  }

  const getStatusBadge = () => {
    if (isLoading) {
      return (
        <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          <Clock className="h-3 w-3 mr-1" />
          Loading
        </Badge>
      )
    }
    
    if (hasError) {
      return (
        <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Unavailable
        </Badge>
      )
    }
    
    return (
      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
        <CheckCircle className="h-3 w-3 mr-1" />
        Online
      </Badge>
    )
  }

  return (
    <div className={cn(
      "space-y-6",
      isFullscreen && "fixed inset-0 z-50 bg-gray-900 p-6"
    )}>
      {/* Platform Header */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-2xl">{title}</CardTitle>
              <p className="text-gray-400 mt-1">{description}</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="border-gray-700"
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="border-gray-700"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(platformUrl, '_blank')}
                className="border-gray-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Platform Content */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className={cn(
            "relative bg-gray-900 rounded-lg overflow-hidden",
            isFullscreen ? "h-[calc(100vh-200px)]" : "h-[600px]"
          )}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <RefreshCw className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-400">Loading {title}...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Establishing secure connection...
                  </p>
                </div>
              </div>
            ) : hasError ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Platform Unavailable</h3>
                  <p className="text-gray-400 mb-4">
                    Unable to connect to {title}. The platform may be under maintenance 
                    or experiencing temporary issues.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleRefresh} variant="outline" className="border-gray-700">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry Connection
                    </Button>
                    <Button 
                      onClick={() => window.open(platformUrl, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Directly
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full">
                {fallbackContent ? (
                  <div className="p-8 h-full flex items-center justify-center">
                    {fallbackContent}
                  </div>
                ) : (
                  <iframe
                    src={platformUrl}
                    className="w-full h-full border-0"
                    title={title}
                    sandbox="allow-same-origin allow-scripts allow-forms"
                    onLoad={() => console.log(`${title} loaded successfully`)}
                    onError={() => setHasError(true)}
                  />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Platform Info Footer */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-400">
              <span>Platform URL: {platformUrl}</span>
              <span>Last Updated: {lastRefresh.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Integration Status:</span>
              {getStatusBadge()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
