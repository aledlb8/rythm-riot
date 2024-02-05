'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Challenge, generateRandomChallenge } from '@/lib/challenge';
import { melodyDescriptions, drumDescriptions, genreDescriptions, getTempoDescription, keyDescriptions } from '@/lib/description';
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getChallengeTimeAndDuration } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const { challengeTime, duration } = getChallengeTimeAndDuration(30);
  const [start, setStart] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<string>(challengeTime);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (countdown > 0 && start) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      const startTime = Date.now();

      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progressPercentage = (elapsedTime / duration) * 100;
        setProgress(progressPercentage);

        const totalSecondsLeft = (duration - elapsedTime) / 1000;
        const minutesLeft = Math.floor(totalSecondsLeft / 60);
        const secondsLeft = Math.floor(totalSecondsLeft % 60);
        setTimeLeft(`${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`);

        if (progressPercentage >= 100) {
          clearInterval(interval!);
          setStart(false);
          setChallenge(null);
        }
      }, 250);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [start, countdown]);

  const handleChallengeStart = () => {
    const newChallenge = generateRandomChallenge();
    setChallenge(newChallenge);
    setStart(false);
    setProgress(0);
    setCountdown(3);
    setTimeLeft(challengeTime);
  };

  const startProgress = () => {
    setStart(true);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-gray-800">
        {!challenge ? (
          <div className="flex flex-col items-center space-y-4">
            <Label className="text-center text-lg font-semibold">Music Challenge</Label>
            <Button onClick={handleChallengeStart}>Start</Button>
          </div>
        ) : (
          <Card className="space-y-6 w-full max-w-xl p-4 bg-white rounded-lg shadow-lg">
            <CardHeader>
              <h2 className="text-xl font-bold text-center">Challenge Details</h2>
            </CardHeader>
            <CardContent>
              <Card className="space-y-6 w-full max-w-xl p-4 bg-white rounded-lg shadow-lg">
                <div className="space-y-2">
                  <Tooltip delayDuration={0}>
                    <Label className="block text-sm font-medium">Melody Type: {" "}
                      <TooltipTrigger asChild>
                        <span className="text-blue-600">{challenge.melodyType}</span>
                      </TooltipTrigger>
                    </Label>
                    <TooltipContent>
                      <p>{melodyDescriptions[challenge.melodyType] || "No information has been found."}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip delayDuration={0}>
                    <Label className="block text-sm font-medium">Drum Type: {" "}
                      <TooltipTrigger asChild>
                        <span className="text-blue-600">{challenge.drumType}</span>
                      </TooltipTrigger>
                    </Label>
                    <TooltipContent>
                      <p>{drumDescriptions[challenge.drumType] || "No information has been found."}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip delayDuration={0}>
                    <Label className="block text-sm font-medium">Genre: {" "}
                      <TooltipTrigger asChild>
                        <span className="text-blue-600">{challenge.genre || "No information has been found."}</span>
                      </TooltipTrigger>
                    </Label>
                    <TooltipContent>
                      <p>{genreDescriptions[challenge.genre] || "No information has been found."}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip delayDuration={0}>
                    <Label className="block text-sm font-medium">Tempo: {" "}
                      <TooltipTrigger asChild>
                        <span className="text-blue-600">{challenge.tempo} BPM</span>
                      </TooltipTrigger>
                    </Label>
                    <TooltipContent>
                      <p>{getTempoDescription(challenge.tempo) || "No information has been found."}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip delayDuration={0}>
                    <Label className="block text-sm font-medium">Key: {" "}
                      <TooltipTrigger asChild>
                        <span className="text-blue-600">{challenge.key || "No information has been found."}</span>
                      </TooltipTrigger>
                    </Label>
                    <TooltipContent>
                      <p>{keyDescriptions[challenge.key]}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </Card>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center ">
              {start && countdown > 0 ? (
                <Label className="text-3xl font-bold text-center">Starting in: {countdown}</Label>
              ) : null}
              {start && countdown === 0 ? (
                <>
                  <Progress value={progress} max={100} className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${progress}%` }}></div>
                  </Progress>
                  <Label className="text-center mt-2">Time Left: {timeLeft}</Label>
                </>
              ) : null}
              {!start ? (
                <div className="flex justify-center space-x-4 mt-4">
                  <Button onClick={startProgress}>Start Challenge</Button>
                  <Button onClick={handleChallengeStart} variant={"destructive"}>Refresh</Button>
                </div>
              ) : null}
            </CardFooter>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}